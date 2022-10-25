import { CreateSupabaseWithAuth } from '../supabase';

type GetRequest = ProductApi.List.Request;
type GetResponse = ProductApi.List.Response | any;

export const get: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = CreateSupabaseWithAuth(req);

  if (req.query.id !== 'undefined') {
    const { data: products } = await supabase
      .from('product')
      .select('*')
      .eq('owner', req.query.id);

    return res.status(200).json(products);
  }

  // TODO: Adicionar log de erros detalhados

  const { data: products, error } = await supabase.from('product').select('*');
  return res.status(200).json(products);
};
