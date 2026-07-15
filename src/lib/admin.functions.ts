import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

async function assertAdmin(ctx: { supabase: any; userId: string }) {
  const { data } = await ctx.supabase.rpc("has_role", { _user_id: ctx.userId, _role: "admin" });
  if (!data) throw new Error("Forbidden");
}

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase.rpc("admin_overview");
    if (error) throw new Error(error.message);
    return data as unknown as {
      total_users: number; users_last_30d: number;
      total_stores: number; published_stores: number;
      total_vehicles: number; available_vehicles: number;
      total_leads: number; leads_last_30d: number;
      pending_payments: number; confirmed_revenue_brl: number;
      active_subs: number;
      plan_breakdown: Record<string, number>;
      recent_signups: Array<{ id: string; email: string; created_at: string }>;
      recent_leads: Array<{ id: string; name: string | null; phone: string | null; email: string | null; store_id: string; vehicle_id: string | null; created_at: string }>;
      recent_audit: Array<{ id: string; entity: string; action: string; actor_name: string | null; summary: string | null; created_at: string }>;
    };
  });

export const listAllUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase.rpc("admin_list_users");
    if (error) throw new Error(error.message);
    return (data ?? []) as Array<{
      id: string; email: string; full_name: string | null;
      created_at: string; last_sign_in_at: string | null; is_admin: boolean;
      plan: string | null; sub_status: string | null;
      stores_count: number; vehicles_count: number; leads_count: number;
    }>;
  });

export const listAllStoresAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase.rpc("admin_list_stores");
    if (error) throw new Error(error.message);
    return (data ?? []) as Array<{
      id: string; name: string; slug: string; published: boolean;
      owner_id: string; owner_email: string | null;
      vehicles_count: number; leads_count: number;
      created_at: string; updated_at: string;
    }>;
  });

const DeleteUserInput = z.object({ user_id: z.string().uuid() });

export const adminDeleteUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => DeleteUserInput.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    if (data.user_id === context.userId) throw new Error("Não é possível excluir o próprio admin");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.user_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const DeleteStoreInput = z.object({ store_id: z.string().uuid() });

export const adminDeleteStore = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => DeleteStoreInput.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("stores").delete().eq("id", data.store_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
