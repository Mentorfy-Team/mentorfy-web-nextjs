import { createClient } from '@supabase/supabase-js';
import { CookieUtil } from '~/shared/utils';

export const SupabaseWithouAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
);

export const CreateSupabaseWithAuth = (req?, token?) => {
  const _token = token ? token : CookieUtil.fromReq(req);
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      headers: {
        Authorization: `Bearer ${_token}`,
      },
    },
  );
};

export const CreateSupabaseWithAdmin = (req) => {
  const token = CookieUtil.fromReq(req);
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
