import { SupabaseServer } from '@app/backend/supabase';

type Request = AuthApi.Post.Request;
type Response = AuthApi.Post.Response;

export const post: Handler.Callback<Request, Response> = async (req, res) => {
  const { email, password } = req.body;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const {
    data: { session, user },
    error,
  } = await SupabaseServer(req, res).auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  return res.status(200).json({
    session,
    user,
    error: error?.message,
  });
};
