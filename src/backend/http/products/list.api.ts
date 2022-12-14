import { SupabaseServer } from '../../supabase';

type GetRequest = ProductApi.List.Request;
type GetResponse = ProductApi.List.Response | any;

export const get: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = SupabaseServer(req, res);

  if (
    !!req.query.id &&
    req.query.id !== 'undefined' &&
    req.query.id !== 'null'
  ) {
    const { data: team_member, error: tmError } = await supabase
      .from('team_member')
      .select('*, team(*)')
      .eq('profile_id', req.query.id);

    const teamProducts = team_member.reduce((acc, team) => {
      return [...acc, ...(team.team as TeamTypes.Team).products];
    }, []);

    const { data: products, error } = await supabase
      .from('product')
      .select('*, member_area(*, member_area_type(*))')
      .or('id.in.(' + teamProducts.join(',') + '), owner.eq.' + req.query.id);

    const { data: relations } = await supabase
      .from('client_product')
      .select('*')
      .in(
        'product_id',
        products?.map((p) => p.id),
      );

    const productRelations = products.map((p) => {
      const productRelations = relations.filter((r) => r.product_id === p.id);
      return {
        ...p,
        relations: productRelations,
      };
    });

    return res.status(200).json(productRelations);
  }

  // TODO: Adicionar log de erros detalhados

  const { data: products, error } = await supabase.from('product').select('*');
  return res.status(200).json(products || []);
};
