export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          referrer: string | null
          session_id: string | null
          store_id: string
          user_agent: string | null
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          referrer?: string | null
          session_id?: string | null
          store_id: string
          user_agent?: string | null
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          referrer?: string | null
          session_id?: string | null
          store_id?: string
          user_agent?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          actor_name: string | null
          changes: Json
          created_at: string
          entity: string
          entity_id: string
          id: string
          store_id: string
          summary: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          actor_name?: string | null
          changes?: Json
          created_at?: string
          entity: string
          entity_id: string
          id?: string
          store_id: string
          summary?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          actor_name?: string | null
          changes?: Json
          created_at?: string
          entity?: string
          entity_id?: string
          id?: string
          store_id?: string
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          email: string | null
          id: string
          message: string | null
          name: string
          notes: string | null
          phone: string | null
          source: string
          status: string
          store_id: string
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          source?: string
          status?: string
          store_id: string
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          source?: string
          status?: string
          store_id?: string
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_requests: {
        Row: {
          admin_notes: string | null
          amount_brl: number
          created_at: string
          cycle: Database["public"]["Enums"]["billing_cycle"]
          id: string
          plan: Database["public"]["Enums"]["plan_tier"]
          proof_url: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
          user_email: string | null
          user_id: string
          user_name: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount_brl: number
          created_at?: string
          cycle?: Database["public"]["Enums"]["billing_cycle"]
          id?: string
          plan: Database["public"]["Enums"]["plan_tier"]
          proof_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
          user_email?: string | null
          user_id: string
          user_name?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount_brl?: number
          created_at?: string
          cycle?: Database["public"]["Enums"]["billing_cycle"]
          id?: string
          plan?: Database["public"]["Enums"]["plan_tier"]
          proof_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
          user_email?: string | null
          user_id?: string
          user_name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      stores: {
        Row: {
          about_text: string | null
          accent_color: string | null
          address: string | null
          city: string | null
          created_at: string
          cta_text: string | null
          font_body: string | null
          font_display: string | null
          hero_headline: string | null
          hero_subheadline: string | null
          id: string
          logo_url: string | null
          name: string
          neutral_color: string | null
          onboarded: boolean
          owner_id: string
          phone: string | null
          plan: Database["public"]["Enums"]["plan_tier"]
          primary_color: string | null
          published: boolean
          secondary_color: string | null
          slug: string
          state: string | null
          style_tag: string | null
          tagline: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          about_text?: string | null
          accent_color?: string | null
          address?: string | null
          city?: string | null
          created_at?: string
          cta_text?: string | null
          font_body?: string | null
          font_display?: string | null
          hero_headline?: string | null
          hero_subheadline?: string | null
          id?: string
          logo_url?: string | null
          name: string
          neutral_color?: string | null
          onboarded?: boolean
          owner_id: string
          phone?: string | null
          plan?: Database["public"]["Enums"]["plan_tier"]
          primary_color?: string | null
          published?: boolean
          secondary_color?: string | null
          slug: string
          state?: string | null
          style_tag?: string | null
          tagline?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          about_text?: string | null
          accent_color?: string | null
          address?: string | null
          city?: string | null
          created_at?: string
          cta_text?: string | null
          font_body?: string | null
          font_display?: string | null
          hero_headline?: string | null
          hero_subheadline?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          neutral_color?: string | null
          onboarded?: boolean
          owner_id?: string
          phone?: string | null
          plan?: Database["public"]["Enums"]["plan_tier"]
          primary_color?: string | null
          published?: boolean
          secondary_color?: string | null
          slug?: string
          state?: string | null
          style_tag?: string | null
          tagline?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          id: string
          plan: Database["public"]["Enums"]["plan_tier"]
          status: Database["public"]["Enums"]["sub_status"]
          store_id: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
          vehicle_limit: number
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          plan?: Database["public"]["Enums"]["plan_tier"]
          status?: Database["public"]["Enums"]["sub_status"]
          store_id?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
          vehicle_limit?: number
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          plan?: Database["public"]["Enums"]["plan_tier"]
          status?: Database["public"]["Enums"]["sub_status"]
          store_id?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
          vehicle_limit?: number
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          brand: string | null
          color: string | null
          created_at: string
          description: string | null
          featured: boolean
          fuel: string | null
          id: string
          km: number | null
          model: string | null
          photos: Json
          price: number | null
          sold: boolean
          store_id: string
          title: string
          transmission: string | null
          updated_at: string
          year: number | null
        }
        Insert: {
          brand?: string | null
          color?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean
          fuel?: string | null
          id?: string
          km?: number | null
          model?: string | null
          photos?: Json
          price?: number | null
          sold?: boolean
          store_id: string
          title: string
          transmission?: string | null
          updated_at?: string
          year?: number | null
        }
        Update: {
          brand?: string | null
          color?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean
          fuel?: string | null
          id?: string
          km?: number | null
          model?: string | null
          photos?: Json
          price?: number | null
          sold?: boolean
          store_id?: string
          title?: string
          transmission?: string | null
          updated_at?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_audit_filters: { Args: never; Returns: Json }
      admin_list_audit: {
        Args: {
          _action?: string
          _actor_id?: string
          _entity?: string
          _from?: string
          _limit?: number
          _offset?: number
          _search?: string
          _to?: string
        }
        Returns: Json
      }
      admin_list_stores: {
        Args: never
        Returns: {
          created_at: string
          id: string
          leads_count: number
          name: string
          owner_email: string
          owner_id: string
          published: boolean
          slug: string
          updated_at: string
          vehicles_count: number
        }[]
      }
      admin_list_subscriptions: {
        Args: never
        Returns: {
          created_at: string
          current_period_end: string
          id: string
          plan: Database["public"]["Enums"]["plan_tier"]
          status: Database["public"]["Enums"]["sub_status"]
          updated_at: string
          user_email: string
          user_id: string
          vehicle_limit: number
        }[]
      }
      admin_list_users: {
        Args: never
        Returns: {
          created_at: string
          email: string
          full_name: string
          id: string
          is_admin: boolean
          last_sign_in_at: string
          leads_count: number
          plan: Database["public"]["Enums"]["plan_tier"]
          stores_count: number
          sub_status: Database["public"]["Enums"]["sub_status"]
          vehicles_count: number
        }[]
      }
      admin_overview: { Args: never; Returns: Json }
      admin_update_subscription: {
        Args: {
          _current_period_end: string
          _plan: Database["public"]["Enums"]["plan_tier"]
          _status: Database["public"]["Enums"]["sub_status"]
          _user_id: string
          _vehicle_limit: number
        }
        Returns: {
          created_at: string
          current_period_end: string | null
          id: string
          plan: Database["public"]["Enums"]["plan_tier"]
          status: Database["public"]["Enums"]["sub_status"]
          store_id: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
          vehicle_limit: number
        }
        SetofOptions: {
          from: "*"
          to: "subscriptions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      audit_actor_name: { Args: { _uid: string }; Returns: string }
      confirm_payment_request: {
        Args: { _notes?: string; _request_id: string }
        Returns: {
          admin_notes: string | null
          amount_brl: number
          created_at: string
          cycle: Database["public"]["Enums"]["billing_cycle"]
          id: string
          plan: Database["public"]["Enums"]["plan_tier"]
          proof_url: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
          user_email: string | null
          user_id: string
          user_name: string | null
        }
        SetofOptions: {
          from: "*"
          to: "payment_requests"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      jsonb_diff: { Args: { _new: Json; _old: Json }; Returns: Json }
      reject_payment_request: {
        Args: { _notes?: string; _request_id: string }
        Returns: {
          admin_notes: string | null
          amount_brl: number
          created_at: string
          cycle: Database["public"]["Enums"]["billing_cycle"]
          id: string
          plan: Database["public"]["Enums"]["plan_tier"]
          proof_url: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
          user_email: string | null
          user_id: string
          user_name: string | null
        }
        SetofOptions: {
          from: "*"
          to: "payment_requests"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      set_subscription_plan: {
        Args: { _period_end?: string; _plan: string; _user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "user"
      billing_cycle: "monthly" | "yearly"
      payment_status: "pending" | "confirmed" | "rejected"
      plan_tier: "free" | "starter" | "pro" | "premium"
      sub_status: "active" | "trialing" | "past_due" | "canceled" | "incomplete"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      billing_cycle: ["monthly", "yearly"],
      payment_status: ["pending", "confirmed", "rejected"],
      plan_tier: ["free", "starter", "pro", "premium"],
      sub_status: ["active", "trialing", "past_due", "canceled", "incomplete"],
    },
  },
} as const
