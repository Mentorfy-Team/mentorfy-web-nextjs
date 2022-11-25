import { handler } from '~/backend/handler';
import { SupabaseAdmin } from '~/backend/supabase';

const get = async (req, res) => {
  const supabase = SupabaseAdmin();

  const { data, error } = await supabase.storage
    .from('images')
    .remove(['52e01419-e905-407a-8933-9227729d3147/mDUpfb.png']);
  res.status(200).json({ data, error });
};

export default handler({ get });
