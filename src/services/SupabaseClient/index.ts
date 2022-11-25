import { createClient } from '@supabase/supabase-js';

const SupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        storageKey: 'sb-storage',
        storage: {
          // use cookies instead of localStorage
          getItem: (key) => {
            return document.cookie
              .split('; ')
              .find((row) => row.startsWith(key))
              .split('=')[1];
          },
          setItem: (key, value) => {
            document.cookie = `${key}=${value}; path=/`;
          },
          removeItem: (key) => {
            document.cookie = `${key}=; Max-Age=-99999999;`;
          },
        },
      },
    },
  );
};

export default SupabaseClient;
