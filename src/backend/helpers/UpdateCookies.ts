import { default as cookieHelper } from 'cookie';

const UpdateCookies = async (supabase, req) => {
  // get sb-storage from cookie
  const headerCookies =
    req?.headers?.cookie && req?.headers?.cookie['supabase-auth-token']
      ? JSON.parse(
          cookieHelper.parse(req?.headers?.cookie)['supabase-auth-token'],
        )
      : '';

  if (headerCookies) await supabase.auth.setSession(headerCookies);

  return headerCookies;
};

export default UpdateCookies;
