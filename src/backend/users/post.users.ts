import { supabase } from '~/backend/supabase';
type Request = UsersApi.Post.Request;
type Response = UsersApi.Post.Response;

export const post: Handler.Callback<Request, Response> = async (req, res) => {
  const { email, password, name } = req.body;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  // * Cria a autenticação do usuário no banco de dados
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  // * Se tudo estiver certo, atualiza o perfil do usuário
  if (!error) {
    await supabase
      .from('profile')
      .update({ name, plan: 'pro' })
      .eq('id', user.id);
  }

  // * Se houver erro, retorna o erro
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
