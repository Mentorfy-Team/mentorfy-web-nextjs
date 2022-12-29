import { SupabaseServer } from '~/backend/supabase';

export const get = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const { data: { user } } = await supabase.auth.getUser();
  console.log(req);

  const { data: product, error } = await supabase
    .from('member_area_tool')
    .select('*')
    .eq('member_area', req.body.product_id);

  if (error) {
    return res.status(400).json({
      error: 'Não foi possível clonar o seu produto',
    });
  }
  return res.status(200).json(product);
};
