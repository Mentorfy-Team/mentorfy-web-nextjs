import { SupabaseServer } from '../../../supabase';

export const get = async (req, res) => {
  const supabase = SupabaseServer(req, res);

  const { data: lead, error: error } = await supabase
    .from('lead_approval')
    .select('*')
    .eq('email', req.body.email)
    .eq('status', 'trial')
    .single();

  res.status(200).json(lead);
};
