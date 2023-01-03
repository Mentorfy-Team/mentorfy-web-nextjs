import { SupabaseServer } from '~/backend/supabase';
import { dateToReadable } from '../clients/list.api';
type Request = UsersApi.Post.Request;
type Response = UsersApi.Post.Response;

export const post: Handler.Callback<Request, Response> = async (req, res) => {
  const {
    user: { email, password, name, active, phone },
    refeerer,
  } = req.body;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!email || !password || !phone) {
    return res
      .status(400)
      .json({ error: 'Email, senha e telefone são obrigatórios.' });
  }

  const supabase = SupabaseServer(req, res);

  // * Cria a autenticação do usuário no banco de dados
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
  });

  // * Se tudo estiver certo, atualiza o perfil do usuário
  if (!error) {
    let leadInfo;
    const defaultExpirationDate = dateToReadable(
      new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    );

    const { data: lead, error: error } = await supabase
      .from('lead_approval')
      .select('*')
      .eq('email', user.email)
      .single();

    leadInfo = lead;
    if (!leadInfo?.id) {
      const { data: newLead } = await supabase
        .from('lead_approval')
        .insert({
          fullname: name,
          email: user.email,
          phone: phone,
          status: 'pending',
          trial_expiration: defaultExpirationDate,
        })
        .eq('email', user.email);

      leadInfo = newLead;
    }

    await supabase
      .from('profile')
      .update({
        name,
        plan: 'Trial',
        email: user.email,
        phone: user.phone,
        access_type: refeerer ? 'mentorado' : 'mentor',
        expiration_date: leadInfo?.trial_expiration ?? defaultExpirationDate,
        lead_id: leadInfo?.id,
        active: leadInfo?.status === 'approved' ? true : false,
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
    } = await supabase
      .from('product')
      .select('id')
      .eq('refeerer', refeerer)
      .single();

    await supabase.from('client_product').insert({
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
