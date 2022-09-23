import { CreateSupabaseWithAuth, SupabaseWithouAuth } from '~/backend/supabase';
type Request = UsersApi.Post.Request;
type Response = UsersApi.Post.Response;

export const post: Handler.Callback<Request, Response> = async (req, res) => {
  const { email, password } = req.body;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { session, user, error } = await SupabaseWithouAuth.auth.signIn({
    email,
    password,
  });

  console.log(email, password);

  Object.assign(req, { body: { session, event: 'SIGNED_IN' } });
  CreateSupabaseWithAuth(req, session.access_token).auth.api.setAuthCookie(
    req,
    res,
  );
};
