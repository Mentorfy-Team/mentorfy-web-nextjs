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

