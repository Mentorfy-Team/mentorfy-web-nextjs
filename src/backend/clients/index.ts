import { SupabaseAdmin, SupabaseServer } from '~/backend/supabase';
import { LogHistory } from '../helpers/LogHistory';
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
  const supabaseAdmin = SupabaseAdmin();

  const { data: existentUser, error: existentError } = await supabaseAdmin
    .from('profile')
    .select('id')
    .eq('email', email)
    .single();
  let userRef = existentUser;
  let errorRes;
  if (!userRef) {
    // * Convida um usuário e cria no banco de autenticação
    const {
      data: { user },
      error: ierror,
    } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      data: {
        name,
        phone,
        product,
      },
      redirectTo: process.env.NEXT_PUBLIC_APP_URL + '?pid=' + product,
    });

    if (!ierror) {
      // ? Registra que o cliente foi convidado e teve seu cadastro criado
      await LogHistory.Create(
        user.id,
        300,
        'Foi convidado para fazer parte da MentorFy',
      );
    }
    // * Depois de convidado, o usuário já existe,
    // * atualizamos com dados extras a autenticação e o perfil
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { phone },
    );
    if (error) {
      errorRes =
        'Usuário convidado, porém esse telefone já está cadastrado em outro usuário, por isso esse numero foi ignorado.';
    }

    await supabaseAdmin
      .from('profile')
      .update({ name, email: email, phone: data?.user?.phone })
      .eq('id', user.id);

    userRef = user;
  }

  // TODO: verificar se o usuário já está cadastrado no produto
  // * Criamos a relação de usuário com o produto
  await supabaseAdmin.from('client_product').insert({
    user_id: userRef.id,
    product_id: product,
  });

  const { data: productData } = await supabaseAdmin
    .from('product')
    .select('id, title')
    .match({
      id: product,
    })
    .single();

  // ? Registra que o cliente foi adicionado ao produto
  await LogHistory.Create(
    userRef.id,
    310,
    `Agora faz parte da mentoria ${productData?.title}`,
    0,
    { id: productData?.id },
  );

  // * Se o usuário ja existia, não precisamos convidar novamente, e damos o feedback
  if (existentError && existentError.message === 'User already registered') {
    return res.status(200).json({
      error:
        'Esse email é membro da mentorfy, produto foi adicionado a sua galeria.',
    });
  }

  res.status(200).json({
    error: errorRes,
  });
};

export const del = async (req, res) => {
  const supabase = SupabaseServer(req);
  // find relations

  const { data: products } = await supabase
    .from('product')
    .select('id, title')
    .eq('owner', req.query.owner_id);

  if (!products) {
    return res.status(400).json({
      error: 'Não foi possível encontrar produtos relacionados.',
    });
  }
  const { error: errorRelation } = await supabase
    .from('client_product')
    .delete()
    .in(
      'product_id',
      products.map((p) => p.id),
    )
    .eq('user_id', req.query.client_id);

  if (errorRelation) {
    return res.status(400).json({
      error: 'Não foi possivel remover a relação com o cliente.',
    });
  }

  const { data: clientProfile, error: errorProfile } = await supabase
    .from('profile')
    .select('name')
    .eq('id', req.query.client_id)
    .single();

  // ? Registra que o cliente foi removido das relações com o mentor e as mentorias
  await LogHistory.Create(
    req.query.client_id,
    312,
    `Agora não faz mais parte da(s) mentoria(s): ${products
      .map((p) => p.title)
      .join(', ')}`,
    0,
    {
      owner_id: req.query.owner_id,
      products: products.map((p) => p.id),
    },
  );

  // ? Registra que o mentor convidou alguem para a mentoria
  await LogHistory.Create(
    req.query.owner_id,
    222,
    `${clientProfile?.name} não faz mais parte da(s) mentoria(s): ${products
      .map((p) => p.title)
      .join(', ')}`,
    0,
    {
      client_id: req.query.client_id,
    },
  );

  return res.status(200).json({
    message: 'Relação removida com sucesso.',
  });
};

export const get: Handler.Callback<Request, Response> = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  res.status(200);
};
