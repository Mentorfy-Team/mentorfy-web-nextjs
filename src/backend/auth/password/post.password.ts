import { supabase } from '~/helpers/supabase';
type Request = AuthApi.Post.Request;
type Response = AuthApi.Post.Response;

export const post: Handler.Callback<Request, Response> = async (req, res) => {
  const { password, access_token } = req.body;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    await supabase.auth.api.updateUser(access_token, {
      password,
    });
    res.status(200).json({
      error: null,
    });
  } catch (error: any) {
    res.status(200).json({
      error: 'Houve um erro ao atualizar a senha, tente novamente.',
    });
  }
};
