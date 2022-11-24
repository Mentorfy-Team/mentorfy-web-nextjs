import { createClient } from '@supabase/supabase-js';
import { CookieUtil } from '~/shared/utils';
import { Database } from '~/@types/supabase/v2.types';

export const SupabaseWithoutAuth = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
    },
  },
);

export const CreateSupabaseWithAuth = (req?, _token?) => {
  const token = _token ? `Bearer ${_token}` : req?.headers?.authorization;
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: token,
        },
      },
      auth: {
        persistSession: true,
      },
    },
  );
};

export const CreateSupabaseWithAdmin = (req?) => {
  const token = req ? CookieUtil.fromReq(req) : '';
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  );
};
