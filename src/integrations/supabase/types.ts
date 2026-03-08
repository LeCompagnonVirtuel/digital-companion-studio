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
      backups: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by: string | null
          error_message: string | null
          file_path: string | null
          id: string
          metadata: Json | null
          size_bytes: number | null
          status: string
          tables_included: string[] | null
          type: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          file_path?: string | null
          id?: string
          metadata?: Json | null
          size_bytes?: number | null
          status?: string
          tables_included?: string[] | null
          type?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          file_path?: string | null
          id?: string
          metadata?: Json | null
          size_bytes?: number | null
          status?: string
          tables_included?: string[] | null
          type?: string
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
      cart_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          quantity: number | null
          session_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          quantity?: number | null
          session_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "digital_products"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          participant_1: string
          participant_2: string
          property_id: string | null
          property_title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          participant_1: string
          participant_2: string
          property_id?: string | null
          property_title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          participant_1?: string
          participant_2?: string
          property_id?: string | null
          property_title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      digital_products: {
        Row: {
          badge: string | null
          benefits: string[] | null
          category: string
          content_details: string[] | null
          created_at: string
          currency: string | null
          description: string | null
          display_order: number | null
          download_url: string | null
          featured_image: string | null
          file_format: string | null
          file_size: string | null
          id: string
          images: string[] | null
          is_bestseller: boolean | null
          is_featured: boolean | null
          is_limited_offer: boolean | null
          is_new: boolean | null
          limited_offer_end: string | null
          original_price: number | null
          preview_url: string | null
          price: number
          problem_solved: string | null
          product_type: string
          sales_count: number | null
          short_description: string | null
          slug: string
          status: string
          title: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          badge?: string | null
          benefits?: string[] | null
          category?: string
          content_details?: string[] | null
          created_at?: string
          currency?: string | null
          description?: string | null
          display_order?: number | null
          download_url?: string | null
          featured_image?: string | null
          file_format?: string | null
          file_size?: string | null
          id?: string
          images?: string[] | null
          is_bestseller?: boolean | null
          is_featured?: boolean | null
          is_limited_offer?: boolean | null
          is_new?: boolean | null
          limited_offer_end?: string | null
          original_price?: number | null
          preview_url?: string | null
          price?: number
          problem_solved?: string | null
          product_type?: string
          sales_count?: number | null
          short_description?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          badge?: string | null
          benefits?: string[] | null
          category?: string
          content_details?: string[] | null
          created_at?: string
          currency?: string | null
          description?: string | null
          display_order?: number | null
          download_url?: string | null
          featured_image?: string | null
          file_format?: string | null
          file_size?: string | null
          id?: string
          images?: string[] | null
          is_bestseller?: boolean | null
          is_featured?: boolean | null
          is_limited_offer?: boolean | null
          is_new?: boolean | null
          limited_offer_end?: string | null
          original_price?: number | null
          preview_url?: string | null
          price?: number
          problem_solved?: string | null
          product_type?: string
          sales_count?: number | null
          short_description?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      downloads: {
        Row: {
          customer_email: string
          downloaded_at: string
          file_id: string | null
          id: string
          ip_address: string | null
          order_id: string
          product_id: string
          user_agent: string | null
        }
        Insert: {
          customer_email: string
          downloaded_at?: string
          file_id?: string | null
          id?: string
          ip_address?: string | null
          order_id: string
          product_id: string
          user_agent?: string | null
        }
        Update: {
          customer_email?: string
          downloaded_at?: string
          file_id?: string | null
          id?: string
          ip_address?: string | null
          order_id?: string
          product_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "downloads_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "product_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "downloads_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "downloads_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "digital_products"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          property_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string
          user_id?: string
        }
        Relationships: []
      }
      fraud_flags: {
        Row: {
          created_at: string
          details: Json | null
          flag_type: string
          id: string
          listing_id: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          severity: string
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          details?: Json | null
          flag_type: string
          id?: string
          listing_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          severity?: string
          status?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          details?: Json | null
          flag_type?: string
          id?: string
          listing_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          severity?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fraud_flags_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
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
      listing_reports: {
        Row: {
          admin_notes: string | null
          created_at: string
          description: string | null
          id: string
          listing_id: string
          reason: string
          reporter_id: string
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          description?: string | null
          id?: string
          listing_id: string
          reason: string
          reporter_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          description?: string | null
          id?: string
          listing_id?: string
          reason?: string
          reporter_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_reports_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          amenities: string[] | null
          area: number | null
          bathrooms: number | null
          city: string | null
          contacts_count: number | null
          created_at: string
          description: string | null
          id: string
          images: string[] | null
          latitude: number | null
          location: string | null
          longitude: number | null
          neighborhood: string | null
          owner_id: string
          price: number
          property_type: string
          rooms: number | null
          saves_count: number | null
          status: string
          title: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          amenities?: string[] | null
          area?: number | null
          bathrooms?: number | null
          city?: string | null
          contacts_count?: number | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          neighborhood?: string | null
          owner_id: string
          price?: number
          property_type?: string
          rooms?: number | null
          saves_count?: number | null
          status?: string
          title: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          amenities?: string[] | null
          area?: number | null
          bathrooms?: number | null
          city?: string | null
          contacts_count?: number | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          neighborhood?: string | null
          owner_id?: string
          price?: number
          property_type?: string
          rooms?: number | null
          saves_count?: number | null
          status?: string
          title?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      maintenance_history: {
        Row: {
          action: string
          created_at: string
          id: string
          metadata: Json | null
          performed_by: string | null
          performed_by_email: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          metadata?: Json | null
          performed_by?: string | null
          performed_by_email?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          performed_by?: string | null
          performed_by_email?: string | null
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
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      neighborhood_price_stats: {
        Row: {
          avg_price: number
          city: string
          id: string
          listing_count: number
          max_price: number
          min_price: number
          neighborhood: string
          property_type: string
          updated_at: string
        }
        Insert: {
          avg_price?: number
          city?: string
          id?: string
          listing_count?: number
          max_price?: number
          min_price?: number
          neighborhood: string
          property_type?: string
          updated_at?: string
        }
        Update: {
          avg_price?: number
          city?: string
          id?: string
          listing_count?: number
          max_price?: number
          min_price?: number
          neighborhood?: string
          property_type?: string
          updated_at?: string
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
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          price: number
          product_id: string
          product_title: string
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          price: number
          product_id: string
          product_title: string
          quantity?: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          price?: number
          product_id?: string
          product_title?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "digital_products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          access_token: string | null
          created_at: string
          currency: string | null
          customer_email: string
          customer_name: string | null
          discount_amount: number | null
          download_count: number | null
          download_link: string | null
          id: string
          notes: string | null
          order_number: string
          payment_id: string | null
          payment_method: string | null
          price: number
          product_id: string
          product_title: string
          promo_code: string | null
          status: string
          updated_at: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          currency?: string | null
          customer_email: string
          customer_name?: string | null
          discount_amount?: number | null
          download_count?: number | null
          download_link?: string | null
          id?: string
          notes?: string | null
          order_number: string
          payment_id?: string | null
          payment_method?: string | null
          price: number
          product_id: string
          product_title: string
          promo_code?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          access_token?: string | null
          created_at?: string
          currency?: string | null
          customer_email?: string
          customer_name?: string | null
          discount_amount?: number | null
          download_count?: number | null
          download_link?: string | null
          id?: string
          notes?: string | null
          order_number?: string
          payment_id?: string | null
          payment_method?: string | null
          price?: number
          product_id?: string
          product_title?: string
          promo_code?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "digital_products"
            referencedColumns: ["id"]
          },
        ]
      }
      owner_ratings: {
        Row: {
          created_at: string
          id: string
          listing_id: string | null
          owner_id: string
          rating: number
          review: string | null
          reviewer_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id?: string | null
          owner_id: string
          rating: number
          review?: string | null
          reviewer_id: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string | null
          owner_id?: string
          rating?: number
          review?: string | null
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "owner_ratings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      owner_verifications: {
        Row: {
          document_type: string
          document_url: string
          id: string
          reviewed_at: string | null
          reviewer_notes: string | null
          status: string
          submitted_at: string
          user_id: string
        }
        Insert: {
          document_type?: string
          document_url: string
          id?: string
          reviewed_at?: string | null
          reviewer_notes?: string | null
          status?: string
          submitted_at?: string
          user_id: string
        }
        Update: {
          document_type?: string
          document_url?: string
          id?: string
          reviewed_at?: string | null
          reviewer_notes?: string | null
          status?: string
          submitted_at?: string
          user_id?: string
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
      product_files: {
        Row: {
          created_at: string
          display_order: number
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          product_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          file_name: string
          file_path: string
          file_size?: number
          file_type?: string
          id?: string
          product_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          product_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_files_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "digital_products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_testimonials: {
        Row: {
          author_avatar: string | null
          author_name: string
          author_title: string | null
          content: string
          created_at: string
          id: string
          is_featured: boolean | null
          product_id: string
          rating: number | null
        }
        Insert: {
          author_avatar?: string | null
          author_name: string
          author_title?: string | null
          content: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          product_id: string
          rating?: number | null
        }
        Update: {
          author_avatar?: string | null
          author_name?: string
          author_title?: string | null
          content?: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          product_id?: string
          rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_testimonials_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "digital_products"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string
          current_uses: number
          discount_percent: number
          expires_at: string | null
          id: string
          is_active: boolean
          max_uses: number | null
          min_order_amount: number | null
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          current_uses?: number
          discount_percent: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          min_order_amount?: number | null
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          current_uses?: number
          discount_percent?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          min_order_amount?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string
          endpoint: string
          id: string
          p256dh: string
          user_id: string
        }
        Insert: {
          auth: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh: string
          user_id: string
        }
        Update: {
          auth?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh?: string
          user_id?: string
        }
        Relationships: []
      }
      shop_customers: {
        Row: {
          created_at: string
          email: string
          first_order_at: string | null
          id: string
          last_order_at: string | null
          name: string | null
          total_orders: number | null
          total_spent: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_order_at?: string | null
          id?: string
          last_order_at?: string | null
          name?: string | null
          total_orders?: number | null
          total_spent?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_order_at?: string | null
          id?: string
          last_order_at?: string | null
          name?: string | null
          total_orders?: number | null
          total_spent?: number | null
          updated_at?: string
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
      user_suspensions: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          reason: string
          suspended_by: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          reason: string
          suspended_by?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          reason?: string
          suspended_by?: string | null
          user_id?: string
        }
        Relationships: []
      }
      visit_confirmations: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          is_real: boolean
          listing_id: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          is_real?: boolean
          listing_id: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          is_real?: boolean
          listing_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "visit_confirmations_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
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
      increment_promo_usage: {
        Args: { promo_code_value: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "tenant" | "owner"
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
      app_role: ["admin", "moderator", "user", "tenant", "owner"],
    },
  },
} as const
