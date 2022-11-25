import { SupabaseServer } from '../supabase';

export const get = async (req, res) => {
  const supabase = SupabaseServer(req);

  const { data: history, error: error } = await supabase
    .from('profile_history')
    .select('*, log_type:code("title", "description")')
    .eq('profile_id', req.query.id)
    .neq('code', 100);

  res.status(200).json(history);
};
