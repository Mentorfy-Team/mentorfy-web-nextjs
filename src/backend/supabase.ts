import { createClient } from '@supabase/supabase-js';

export const SupabaseWithouAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const CreateSupabaseWithAuth = (token) => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
