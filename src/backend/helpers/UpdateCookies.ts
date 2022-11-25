import { default as cookieHelper } from 'cookie';

const UpdateCookies = async (supabase, req) => {
  // get sb-storage from cookie
  const headerCookies = req?.headers?.cookie
    ? JSON.parse(cookieHelper.parse(req?.headers?.cookie)['sb-storage'])
    : '';

  if (headerCookies) await supabase.auth.setSession(headerCookies);

  return headerCookies;
};

export default UpdateCookies;
