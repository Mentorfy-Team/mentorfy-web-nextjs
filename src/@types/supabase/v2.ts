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
      product: {
        Row: {
          id: number;
          owner: string | null;
          created_at: string | null;
          title: string | null;
          description: string | null;
          title_image: string | null;
          imagem: string | null;
          price: number | null;
          deliver: string | null;
        };
        Insert: {
          id?: number;
          owner?: string | null;
          created_at?: string | null;
          title?: string | null;
          description?: string | null;
          title_image?: string | null;
          imagem?: string | null;
          price?: number | null;
          deliver?: string | null;
        };
        Update: {
          id?: number;
          owner?: string | null;
          created_at?: string | null;
          title?: string | null;
          description?: string | null;
          title_image?: string | null;
          imagem?: string | null;
          price?: number | null;
          deliver?: string | null;
        };
      };
      profile: {
        Row: {
          created_at: string | null;
          is_subscribed: boolean | null;
          interval: string | null;
          name: string | null;
          plan: string;
          id: string;
          avatar: string | null;
        };
        Insert: {
          created_at?: string | null;
          is_subscribed?: boolean | null;
          interval?: string | null;
          name?: string | null;
          plan?: string;
          id: string;
          avatar?: string | null;
        };
        Update: {
          created_at?: string | null;
          is_subscribed?: boolean | null;
          interval?: string | null;
          name?: string | null;
          plan?: string;
          id?: string;
          avatar?: string | null;
        };
      };
      address: {
        Row: {
          id: string;
          created_at: string | null;
          zipcode: string | null;
          street: string | null;
          number: number | null;
          city: string | null;
          state: string | null;
          complement: string | null;
          country: string | null;
          neighborhood: string | null;
        };
        Insert: {
          id: string;
          created_at?: string | null;
          zipcode?: string | null;
          street?: string | null;
          number?: number | null;
          city?: string | null;
          state?: string | null;
          complement?: string | null;
          country?: string | null;
          neighborhood?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          zipcode?: string | null;
          street?: string | null;
          number?: number | null;
          city?: string | null;
          state?: string | null;
          complement?: string | null;
          country?: string | null;
          neighborhood?: string | null;
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

