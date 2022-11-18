import { CreateSupabaseWithAdmin } from '~/backend/supabase';

export const get = async (req, res) => {
  if (!req.query.refeerer) {
    return res.status(200).send('Done');
  }

  const supabase = CreateSupabaseWithAdmin();
  const { data: product, error } = await supabase
    .from('product')
    .select('main_image, title, id')
    .eq('refeerer', req.query.refeerer)
    .single();

  return res.status(200).json({
    product,
    error: error?.message,
  });
};
