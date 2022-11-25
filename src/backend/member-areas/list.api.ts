import { SupabaseServer } from '../supabase';

type GetRequest = ProductApi.List.Request;
type GetResponse = ProductApi.List.Response | any;

export const get: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = SupabaseServer(req, res);

  const { data: products, error } = await supabase
    .from('product')
    .select('id, title, status, member_area(id)')
    .eq('owner', req.query.id)
    .eq('deliver', 'mentorfy');

  if (products)
    for (const product of products) {
      const { data: clients, error } = await supabase
        .from('client_product')
        .select('*')
        .eq('product_id', product.id);
      product['clients'] = clients?.length;
    }

  // TODO: Adicionar log de erros detalhados

  return res.status(200).json(products);
};
