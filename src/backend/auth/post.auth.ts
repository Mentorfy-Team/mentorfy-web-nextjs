import { supabase } from '~/backend/supabase';
type Request = UsersApi.Post.Request;
type Response = UsersApi.Post.Response;

export const post: Handler.Callback<Request, Response> = async (req, res) => {
  const { email, password } = req.body;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { session, user } = await SupabaseWithouAuth.auth.signIn({
    email,
    password,
  });

  Object.assign(req, { body: { session, event: 'SIGNED_IN' } });
  SupabaseWithouAuth.auth.api.setAuthCookie(req, res);
};
