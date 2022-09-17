import { CreateSupabaseWithAdmin } from '~/backend/supabase';
type Request = UserClient.Post.Request;
type Response = UserClient.Post.Response;

export const post: Handler.Callback<Request, Response> = async (req, res) => {
  const { email, phone, product, name } = req.body;
  if (!email || !product || !name) {
    return res.status(400).json({
      error: 'Dados inválidos',
    });
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const supabaseAdmin = CreateSupabaseWithAdmin();

  const { data: existentUser, error: existentError } = await supabaseAdmin
    .from<ExternalModules.Supabase.User>('profile')
    .select('id')
    .eq('email', email)
    .single();
  let userRef = existentUser;
  if (!userRef) {
    // * Convida um usuário
    const { data: user, error } =
      await supabaseAdmin.auth.api.inviteUserByEmail(email, {
        data: {
          name,
          phone,
          product,
        },
        redirectTo: process.env.NEXT_PUBLIC_APP_URL + '?pid=' + product,
      });
    await supabaseAdmin
      .from('profile')
      .update({ name, email: user.email, phone: user.phone })
      .eq('id', user.id);

    userRef = user;
  }
  const { data, error } = await supabaseAdmin.from('client_product').insert({
    user_id: userRef.id,
    product_id: product,
  });

  // * Se houver erro, retorna o erro
  if (existentError && existentError.message === 'User already registered') {
    return res.status(200).json({
      error:
        'Esse email é membro da mentorfy, produto foi adicionado a sua galeria.',
    });
  }

  res.status(200).json({
    error: existentError?.message,
  });
};

export const get: Handler.Callback<Request, Response> = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  res.status(200);
};
