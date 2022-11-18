import { SupabaseWithoutAuth } from '~/backend/supabase';
type Request = AuthApi.Post.Request;
type Response = AuthApi.Post.Response;

export const post: Handler.Callback<Request, Response> = async (req, res) => {
  const { email } = req.body;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    await SupabaseWithoutAuth.auth.resetPasswordForEmail(email);
  } catch {
    // TODO: logar erro de reset de senha
  }
  res.status(200).json({
    error: null,
  });
};
