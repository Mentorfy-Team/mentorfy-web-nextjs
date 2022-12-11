import { SupabaseServer } from '~/backend/supabase';
type GetRequest = ProductApi.Get.Request;
type GetResponse = ProductApi.Get.Response | any;

export const get: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = SupabaseServer(req, res);
  let listProducts = [];
  const { data: clientProducts } = await supabase
    .from('client_product')
    .select('*, product(*)')
    .eq('user_id', req.query.id);

  const { data: productsOwned, error: poe } = await supabase
    .from('product')
    .select('*, member_area(*, member_area_type(*))')
    .eq('owner', req.query.id);

  if (productsOwned && productsOwned.length > 0)
    listProducts = listProducts.concat(productsOwned);

  if (clientProducts && clientProducts.length > 0) {
    const { data: products, error } = await supabase
      .from('product')
      .select('*, member_area(*, member_area_type(*))')
      .in(
        'id',
        clientProducts?.map((relation) => relation.product_id),
      );

    if (products) {
      listProducts = listProducts.concat(
        products.map((p) => ({
          ...p,
          relation: clientProducts.find((cp) => cp.product_id === p.id),
        })),
      );
    }
  }

  const { data: tools, error: errorTools } = await supabase
    .from('member_area_tool')
    .select('*')
    .in(
      'member_area',
      listProducts.map((p) => p.id),
    );

  const toolsList = tools?.map((tool) => {
    tool['type'] = (tool as any).type;
    return tool;
  });

  const { data: userInputs, error: erroru } = await supabase
    .from('client_input_tool')
    .select('*')
    .eq('profile_id', req.query.id);

  const productsWithProgress = listProducts.map((p) => {
    const anws = userInputs.filter(
      (input) =>
        !!toolsList.find(
          (tl) =>
            tl.id === input.member_area_tool_id && p.id === tl.member_area,
        ),
    ).length;

    const percent = anws / toolsList.filter((t) => t.type !== 0).length;

    const calc = parseFloat((percent * 100).toFixed(2));

    return {
      ...p,
      progress: calc,
    };
  });

  // make productsWithProgress should return unique products based on id
  const uniqueProducts = productsWithProgress.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
  );

  return res
    .status(200)
    .json(
      uniqueProducts.filter(
        (p) => !req.query.related_id || p.owner === req.query.related_id,
      ),
    );
};
