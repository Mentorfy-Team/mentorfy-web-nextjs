import { LogHistory } from '~/backend/helpers/LogHistory';
import { SupabaseServer } from '../../supabase';

type GetRequest = MemberAreaTypes.Post.Request;
type GetResponse = MemberAreaTypes.Post.Response | any;

export const post: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = SupabaseServer(req, res);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const client_id = req.body.client_id;
  const product_id = req.body.product_id;
  const approved = req.body.approved;

  if (approved) {
    const { error: erroru } = await supabase
      .from('client_product')
      .update({ approved })
      .match({
        user_id: client_id,
        product_id: product_id,
      });
  } else {
    const { error: erroru } = await supabase
      .from('client_product')
      .delete()
      .match({
        user_id: client_id,
        product_id: product_id,
      });
  }

  const {
    data: { email },
  } = await supabase
    .from('profile')
    .select('email')
    .eq('id', client_id)
    .single();

  const {
    data: { title },
  } = await supabase
    .from('product')
    .select('title')
    .eq('id', product_id)
    .single();

  // ? Registra que a solicitação foi aprovada ou rejeitada pelo responsavel
  await LogHistory.Create(
    product_id,
    approved ? 230 : 231,
    `A solicitação de acesso de ${email} a mentoria foi ${
      approved ? 'aprovado' : 'reprovado'
    } por ${user.email}.`,
    0,
    {
      client_id,
      client_email: email,
    },
  );

  // ? Registra que a solicitação foi aprovada ou rejeitada pelo responsavel
  await LogHistory.Create(
    client_id,
    approved ? 230 : 231,
    `A solicitação de acesso a mentoria ${title} foi ${
      approved ? 'aprovado' : 'reprovado'
    } pelo responsável.`,
    0,
    {
      product_id,
    },
  );

  return res.status(200).json({});
};
