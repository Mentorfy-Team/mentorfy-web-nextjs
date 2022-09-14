import { createClient } from '@supabase/supabase-js';
import { CookieUtil } from '~/shared/utils';

export const SupabaseWithouAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const CreateSupabaseWithAuth = (req) => {
  const token = CookieUtil.fromReq(req);
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
