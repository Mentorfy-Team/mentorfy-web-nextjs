export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      member_area_type: {
        Row: {
          id: number;
          created_at: string | null;
          name: string;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          name: string;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          name?: string;
        };
      };
      client_product: {
        Row: {
          user_id: string;
          product_id: string;
          created_at: string | null;
          id: string;
          subscription: boolean | null;
          interval: string | null;
        };
        Insert: {
          user_id: string;
          product_id: string;
          created_at?: string | null;
          id?: string;
          subscription?: boolean | null;
          interval?: string | null;
        };
        Update: {
          user_id?: string;
          product_id?: string;
          created_at?: string | null;
          id?: string;
          subscription?: boolean | null;
          interval?: string | null;
        };
      };
      member_area_tool: {
        Row: {
          id: string;
          created_at: string | null;
          member_area: string | null;
          mentor_tool: number | null;
          title: string | null;
          description: string | null;
          status: boolean | null;
          data: Json | null;
          order: number | null;
          extra: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          member_area?: string | null;
          mentor_tool?: number | null;
          title?: string | null;
          description?: string | null;
          status?: boolean | null;
          data?: Json | null;
          order?: number | null;
          extra?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          member_area?: string | null;
          mentor_tool?: number | null;
          title?: string | null;
          description?: string | null;
          status?: boolean | null;
          data?: Json | null;
          order?: number | null;
          extra?: Json | null;
        };
      };
      member_area: {
        Row: {
          id: string;
          created_at: string | null;
          type_id: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          type_id?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          type_id?: number | null;
        };
      };
      client_input_tool: {
        Row: {
          id: number;
          created_at: string | null;
          profile_id: string;
          member_area_tool_id: string;
          data: Json;
          extra: Json | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          profile_id: string;
          member_area_tool_id: string;
          data: Json;
          extra?: Json | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          profile_id?: string;
          member_area_tool_id?: string;
          data?: Json;
          extra?: Json | null;
        };
      };
      product: {
        Row: {
          owner: string;
          created_at: string | null;
          title: string;
          description: string | null;
          main_image: string | null;
          banner_image: string | null;
          price: number;
          deliver: string | null;
          status: boolean | null;
          access_link: string | null;
          id: string;
          refeerer: string | null;
          member_area: string | null;
        };
        Insert: {
          owner: string;
          created_at?: string | null;
          title: string;
          description?: string | null;
          main_image?: string | null;
          banner_image?: string | null;
          price?: number;
          deliver?: string | null;
          status?: boolean | null;
          access_link?: string | null;
          id?: string;
          refeerer?: string | null;
          member_area?: string | null;
        };
        Update: {
          owner?: string;
          created_at?: string | null;
          title?: string;
          description?: string | null;
          main_image?: string | null;
          banner_image?: string | null;
          price?: number;
          deliver?: string | null;
          status?: boolean | null;
          access_link?: string | null;
          id?: string;
          refeerer?: string | null;
          member_area?: string | null;
        };
      };
      profile: {
        Row: {
          id: string;
          created_at: string | null;
          is_subscribed: boolean | null;
          interval: string | null;
          name: string | null;
          plan: string;
          avatar: string | null;
          access_type: string | null;
          email: string | null;
          phone: string | null;
        };
        Insert: {
          id: string;
          created_at?: string | null;
          is_subscribed?: boolean | null;
          interval?: string | null;
          name?: string | null;
          plan?: string;
          avatar?: string | null;
          access_type?: string | null;
          email?: string | null;
          phone?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          is_subscribed?: boolean | null;
          interval?: string | null;
          name?: string | null;
          plan?: string;
          avatar?: string | null;
          access_type?: string | null;
          email?: string | null;
          phone?: string | null;
        };
      };
      mentor_tool: {
        Row: {
          id: number;
          created_at: string | null;
          name: string;
          description: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          name: string;
          description?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          name?: string;
          description?: string | null;
        };
      };
      address: {
        Row: {
          id: string;
          created_at: string | null;
          zipcode: string | null;
          street: string | null;
          number: number | null;
          complement: string | null;
          neighborhood: string | null;
          city: string | null;
          state: string | null;
          country: string | null;
        };
        Insert: {
          id: string;
          created_at?: string | null;
          zipcode?: string | null;
          street?: string | null;
          number?: number | null;
          complement?: string | null;
          neighborhood?: string | null;
          city?: string | null;
          state?: string | null;
          country?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          zipcode?: string | null;
          street?: string | null;
          number?: number | null;
          complement?: string | null;
          neighborhood?: string | null;
          city?: string | null;
          state?: string | null;
          country?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

