import { supabase } from '~/helpers/supabase';
type Request = UsersApi.Post.Request;
type Response = UsersApi.Post.Response;

export const post: Handler.Callback<Request, Response> = async (req, res) => {
  const { email, password } = req.body;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error && error.message === 'User already registered') {
    return res
      .status(200)
      .json({ error: 'Esse email já está sendo utilizado.' });
  }

  res.status(200).json({
    user,
    error: error?.message,
  });
};

export const get: Handler.Callback<Request, Response> = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  res.status(200);
};
