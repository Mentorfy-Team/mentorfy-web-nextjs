import { CreateSupabaseWithAuth } from '../supabase';

type GetRequest = ProductApi.List.Request;
type GetResponse = ProductApi.List.Response | any;

export const get: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = CreateSupabaseWithAuth(req);

  const { data: products } = await supabase
    .from('product')
    .select('*')
    .eq('owner', req.query.id);

  // TODO: Adicionar log de erros detalhados

  return res.status(200).json(products);
};