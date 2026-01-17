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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          metadata: Json | null
          page_path: string | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          metadata?: Json | null
          page_path?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          page_path?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          author_name: string
          category: string
          content: string | null
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          published_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string
          views: number
        }
        Insert: {
          author_id?: string | null
          author_name?: string
          category?: string
          content?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
          views?: number
        }
        Update: {
          author_id?: string | null
          author_name?: string
          category?: string
          content?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
          views?: number
        }
        Relationships: []
      }
      leads: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          notes: string | null
          phone: string | null
          source: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          alt_text: string | null
          created_at: string
          file_path: string
          file_size: number
          id: string
          mime_type: string
          name: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          file_path: string
          file_size: number
          id?: string
          mime_type: string
          name: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          file_path?: string
          file_size?: number
          id?: string
          mime_type?: string
          name?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean
          message: string
          title: string
          type: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean
          message?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      portfolio_projects: {
        Row: {
          client: string | null
          created_at: string
          description: string | null
          display_order: number | null
          duration: string | null
          featured_image: string | null
          id: string
          images: string[] | null
          objectives: string | null
          problem: string | null
          project_url: string | null
          results: string | null
          service_category: string
          services_provided: string[] | null
          short_description: string | null
          slug: string
          solution: string | null
          status: string
          technologies: string[] | null
          testimonial: string | null
          testimonial_author: string | null
          title: string
          updated_at: string
          year: string | null
        }
        Insert: {
          client?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          duration?: string | null
          featured_image?: string | null
          id?: string
          images?: string[] | null
          objectives?: string | null
          problem?: string | null
          project_url?: string | null
          results?: string | null
          service_category?: string
          services_provided?: string[] | null
          short_description?: string | null
          slug: string
          solution?: string | null
          status?: string
          technologies?: string[] | null
          testimonial?: string | null
          testimonial_author?: string | null
          title: string
          updated_at?: string
          year?: string | null
        }
        Update: {
          client?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          duration?: string | null
          featured_image?: string | null
          id?: string
          images?: string[] | null
          objectives?: string | null
          problem?: string | null
          project_url?: string | null
          results?: string | null
          service_category?: string
          services_provided?: string[] | null
          short_description?: string | null
          slug?: string
          solution?: string | null
          status?: string
          technologies?: string[] | null
          testimonial?: string | null
          testimonial_author?: string | null
          title?: string
          updated_at?: string
          year?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content: Json
          created_at: string
          id: string
          section: string
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          section: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          section?: string
          updated_at?: string
        }
        Relationships: []
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
