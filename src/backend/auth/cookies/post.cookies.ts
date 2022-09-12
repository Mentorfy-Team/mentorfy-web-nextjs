import { supabase } from '~/backend/supabase';
type Request = AuthApi.Post.Request;
type Response = AuthApi.Post.Response;

export const post: Handler.Callback<Request, Response> = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    supabase.auth.api.setAuthCookie(req, res);
    res.status(200).json({
      error: null,
    });
  } catch (error: any) {
    res.status(200).json({
      error: 'Houve um erro ao atualizar os cookies.',
    });
  }
};
