import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { Activity, ShieldCheck, Loader2, Search, X, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { amIAdmin } from "@/lib/payments.functions";
import { listAuditLogs, getAuditFilters } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/auditoria")({
  head: () => ({ meta: [{ title: "Admin — Auditoria" }, { name: "robots", content: "noindex" }] }),
  beforeLoad: async () => {
    const { isAdmin } = await amIAdmin();
    if (!isAdmin) throw redirect({ to: "/dashboard" });
  },
  component: AdminAudit,
});

const PAGE_SIZES = [10, 25, 50, 100];

function AdminAudit() {
  const listFn = useServerFn(listAuditLogs);
  const filtersFn = useServerFn(getAuditFilters);

  const [entity, setEntity] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [actorId, setActorId] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(25);
  const [page, setPage] = useState<number>(0);

  const filters = useQuery({
    queryKey: ["admin-audit-filters"],
    queryFn: () => filtersFn(),
    staleTime: 60_000,
  });

  const query = useMemo(() => {
    const toIso = (v: string) => (v ? new Date(v).toISOString() : undefined);
    return {
      entity: entity || undefined,
      action: action || undefined,
      actor_id: actorId || undefined,
      from: toIso(from),
      to: toIso(to),
      search: search.trim() || undefined,
      limit: pageSize,
      offset: page * pageSize,
    };
  }, [entity, action, actorId, from, to, search, pageSize, page]);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["admin-audit", query],
    queryFn: () => listFn({ data: query }),
    placeholderData: (prev) => prev,
  });

  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const showingFrom = total === 0 ? 0 : page * pageSize + 1;
  const showingTo = Math.min(total, (page + 1) * pageSize);

  const resetFilters = () => {
    setEntity(""); setAction(""); setActorId(""); setFrom(""); setTo(""); setSearch("");
    setPage(0);
  };

  const applyAndResetPage = <T,>(setter: (v: T) => void) => (v: T) => { setter(v); setPage(0); };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface/40">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <ShieldCheck className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-display text-lg font-bold leading-none">AutoSite Admin</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Auditoria do sistema</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/admin" label="Visão geral" />
            <NavLink to="/admin/usuarios" label="Usuários" />
            <NavLink to="/admin/lojas" label="Lojas" />
            <NavLink to="/admin/pagamentos" label="Pagamentos" />
            <NavLink to="/admin/assinaturas" label="Assinaturas" />
            <NavLink to="/admin/auditoria" label="Auditoria" />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold">Auditoria</h1>
            <p className="mt-1 text-muted-foreground">Histórico completo de atividades com filtros e paginação.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1.5 text-xs font-semibold text-primary">
            <Activity className="h-3.5 w-3.5" /> {total.toLocaleString("pt-BR")} eventos
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-card">
          <div className="grid gap-3 md:grid-cols-6">
            <Field label="Tipo">
              <select
                value={entity}
                onChange={(e) => applyAndResetPage(setEntity)(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="">Todos</option>
                {(filters.data?.entities ?? []).map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </Field>
            <Field label="Ação">
              <select
                value={action}
                onChange={(e) => applyAndResetPage(setAction)(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="">Todas</option>
                {(filters.data?.actions ?? []).map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </Field>
            <Field label="Usuário">
              <select
                value={actorId}
                onChange={(e) => applyAndResetPage(setActorId)(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="">Todos</option>
                {(filters.data?.actors ?? []).map((a) => (
                  <option key={a.actor_id} value={a.actor_id}>{a.actor_name}</option>
                ))}
              </select>
            </Field>
            <Field label="De">
              <input
                type="datetime-local" value={from}
                onChange={(e) => applyAndResetPage(setFrom)(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Até">
              <input
                type="datetime-local" value={to}
                onChange={(e) => applyAndResetPage(setTo)(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Busca">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text" value={search} placeholder="Resumo ou nome"
                  onChange={(e) => applyAndResetPage(setSearch)(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background pl-8 pr-8 py-2 text-sm"
                />
                {search && (
                  <button
                    onClick={() => applyAndResetPage(setSearch)("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Limpar busca"
                  ><X className="h-4 w-4" /></button>
                )}
              </div>
            </Field>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs hover:bg-surface"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Limpar filtros
            </button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Itens por página:</span>
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setPage(0); }}
                className="rounded-lg border border-border bg-background px-2 py-1"
              >
                {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              <button
                onClick={() => refetch()}
                className="rounded-full border border-border px-3 py-1 hover:bg-surface"
              >Atualizar</button>
            </div>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface/60 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Quando</th>
                  <th className="px-4 py-3 text-left">Tipo</th>
                  <th className="px-4 py-3 text-left">Ação</th>
                  <th className="px-4 py-3 text-left">Usuário</th>
                  <th className="px-4 py-3 text-left">Resumo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {isFetching && !data && (
                  <tr><td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                  </td></tr>
                )}
                {data && data.items.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    Nenhum evento para os filtros aplicados.
                  </td></tr>
                )}
                {data?.items.map((a) => (
                  <tr key={a.id} className="hover:bg-surface/40">
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                      {new Date(a.created_at).toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">{a.entity}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary">{a.action}</span>
                    </td>
                    <td className="px-4 py-3 text-xs">{a.actor_name ?? "—"}</td>
                    <td className="px-4 py-3">{a.summary ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface/30 px-4 py-3 text-xs text-muted-foreground">
            <span>Mostrando {showingFrom.toLocaleString("pt-BR")}–{showingTo.toLocaleString("pt-BR")} de {total.toLocaleString("pt-BR")}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0 || isFetching}
                className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 disabled:opacity-40 hover:bg-surface"
              ><ChevronLeft className="h-3.5 w-3.5" /> Anterior</button>
              <span className="px-2">Página {page + 1} de {totalPages}</span>
              <button
                onClick={() => setPage((p) => (p + 1 < totalPages ? p + 1 : p))}
                disabled={page + 1 >= totalPages || isFetching}
                className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 disabled:opacity-40 hover:bg-surface"
              >Próxima <ChevronRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function NavLink({ to, label }: { to: "/admin" | "/admin/usuarios" | "/admin/lojas" | "/admin/pagamentos" | "/admin/assinaturas" | "/admin/auditoria"; label: string }) {
  return (
    <Link to={to} activeOptions={{ exact: to === "/admin" }} className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-surface hover:text-foreground [&.active]:bg-primary/15 [&.active]:text-primary">
      {label}
    </Link>
  );
}
