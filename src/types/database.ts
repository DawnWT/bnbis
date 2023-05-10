export type Json =
  | Json[]
  | boolean
  | number
  | string
  | { [key: string]: Json }
  | null

export interface Database {
  public: {
    Tables: {
      Listing: {
        Row: {
          bathroom_count: number
          category: string
          created_at: string | null
          description: string
          guest_count: number
          id: number
          image_src: string
          location_value: string
          price: number
          room_count: number
          title: string
          user_id: string
        }
        Insert: {
          bathroom_count: number
          category: string
          created_at?: string | null
          description: string
          guest_count: number
          id?: number
          image_src: string
          location_value: string
          price: number
          room_count: number
          title: string
          user_id: string
        }
        Update: {
          bathroom_count?: number
          category?: string
          created_at?: string | null
          description?: string
          guest_count?: number
          id?: number
          image_src?: string
          location_value?: string
          price?: number
          room_count?: number
          title?: string
          user_id?: string
        }
      }
      reservations: {
        Row: {
          created_at: string | null
          end_date: string
          id: number
          listing_id: number
          start_date: string
          total_price: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: number
          listing_id: number
          start_date: string
          total_price: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: number
          listing_id?: number
          start_date?: string
          total_price?: number
          user_id?: string
        }
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          email_verified: string | null
          hashed_password: string | null
          id: string
          image: string | null
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          email_verified?: string | null
          hashed_password?: string | null
          id: string
          image?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          email_verified?: string | null
          hashed_password?: string | null
          id?: string
          image?: string | null
          name?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}