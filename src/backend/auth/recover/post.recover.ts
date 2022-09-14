import { supabase } from '~/backend/supabase';
type Request = UsersApi.Post.Request;
type Response = UsersApi.Post.Response;

export const post: Handler.Callback<Request, Response> = async (req, res) => {
  const { email } = req.body;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    await SupabaseWithouAuth.auth.api.resetPasswordForEmail(email);
  } catch {
    // TODO: logar erro de reset de senha
  }
  res.status(200).json({
    error: null,
  });
};
