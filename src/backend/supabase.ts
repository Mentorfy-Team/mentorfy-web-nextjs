import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '~/@types/supabase/v2.types';

import { default as cookieHelper } from 'cookie';
import { createClient } from '@supabase/supabase-js';

export const SupabaseServer = (req, res) => {
  const supabase = createServerSupabaseClient<Database>({
    req,
    res,
  });

  return supabase;
};

export const SupabaseAdmin = (req?) => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE,
  );
};

const getToken = (req, _token?) => {
  const headerCookies = req?.headers?.cookie
    ? JSON.parse(cookieHelper.parse(req?.headers?.cookie)['sb-storage'])
    : '';
  const fromHeader = headerCookies
    ? headerCookies['access_token']
    : req?.headers?.authorization;

  let token = _token ? _token : fromHeader;

  if (!token?.includes('Bearer ')) {
    token = 'Bearer ' + token;
  }

  return token;
};
