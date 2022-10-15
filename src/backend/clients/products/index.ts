import { CreateSupabaseWithAuth } from '~/backend/supabase';

export const get: Handler.Callback<Request, Response> = async (req, res) => {
  const supabase = CreateSupabaseWithAuth(req);
  const { data: products, error } = await supabase
    .from('product')
    .select('*, member_area!member_area_id_fkey(*)')
    .eq('owner', req.query.id);

  return res.status(200).json(products);
};
