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
          id: string;
          created_at: string | null;
          is_subscribed: boolean | null;
          interval: string | null;
          name: string | null;
          plan: string;
        };
        Insert: {
          id: string;
          created_at?: string | null;
          is_subscribed?: boolean | null;
          interval?: string | null;
          name?: string | null;
          plan?: string;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          is_subscribed?: boolean | null;
          interval?: string | null;
          name?: string | null;
          plan?: string;
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

