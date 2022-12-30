import { SupabaseServer } from '../../../supabase';

export const get = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  console.log('lead: ', req.query.email);
  const { data: lead, error: error } = await supabase
    .from('lead_approval')
    .select('*')
    .eq('email', req.query.email)
    .eq('status', 'approved')
    .single();
  console.log('lead data: ', lead, error);
  res.status(200).json(lead);
};
