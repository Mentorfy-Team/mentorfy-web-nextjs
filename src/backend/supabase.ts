import { createClient } from '@supabase/supabase-js';
import { CookieUtil } from '~/shared/utils';

export const SupabaseWithouAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const CreateSupabaseWithAuth = (req?, _token?) => {
  const token = _token ? _token : CookieUtil.fromReq(req);

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

export const CreateSupabaseWithAdmin = (req?) => {
  const token = req ? CookieUtil.fromReq(req) : '';
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
