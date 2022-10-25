import { CreateSupabaseWithAuth } from '~/backend/supabase';
type GetRequest = ProductApi.Get.Request;
type GetResponse = ProductApi.Get.Response | any;

export const get: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = CreateSupabaseWithAuth(req);
  let listProducts = [];
  const { data: clientProducts } = await supabase
    .from('client_product')
    .select('*, product(*)')
    .eq('user_id', req.query.id);

  const { data: productsOwned, error: poe } = await supabase
    .from('product')
    .select('*, member_area(*)')
    .eq('owner', req.query.id);

  if (productsOwned && productsOwned.length > 0)
    listProducts = listProducts.concat(productsOwned);

  if (clientProducts && clientProducts.length > 0) {
    const { data: products, error } = await supabase
      .from('product')
      .select('*, member_area(*)')
      .in(
        'id',
        clientProducts?.map((relation) => relation.product_id),
      );
    if (products) listProducts = listProducts.concat(products);
  }

  return res.status(200).json(listProducts);
};
