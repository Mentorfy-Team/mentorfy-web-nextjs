import { SupabaseServer } from '~/backend/supabase';
type Request = UsersApi.Post.Request;
type Response = UsersApi.Post.Response;

export const post: Handler.Callback<Request, Response> = async (req, res) => {
  const {
    user: { email, password, name, active },
    refeerer,
  } = req.body;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  // * Cria a autenticação do usuário no banco de dados
  const {
    data: { user },
    error,
  } = await SupabaseServer(req, res).auth.signUp({
    email,
    password,
  });

  // * Se tudo estiver certo, atualiza o perfil do usuário
  if (!error) {
    await SupabaseServer(req, res)
      .from('profile')
      .update({
        name,
        plan: 'pro',
        email: user.email,
        phone: user.phone,
        access_type: refeerer ? 'mentorado' : 'mentor',
        active: active,
      })
      .eq('id', user.id);
  }

  // * Se houver erro, retorna o erro
  if (error && error.message === 'User already registered') {
    return res
      .status(200)
      .json({ error: 'Esse email já está sendo utilizado.' });
  }

  if (refeerer) {
    const {
      data: { id },
    } = await SupabaseServer(req, res)
      .from('product')
      .select('id')
      .eq('refeerer', refeerer)
      .single();

    await SupabaseServer(req, res).from('client_product').insert({
      user_id: user.id,
      product_id: id,
      subscription: true,
      approved: false,
    });
  }

  res.status(200).json({
    user,
    error: error?.message,
  });
};

export const get = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  res.status(200).json({});
};
