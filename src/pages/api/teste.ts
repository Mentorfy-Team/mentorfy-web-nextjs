import { handler } from '~/backend/handler';
import { CreateSupabaseWithAdmin } from '~/backend/supabase';

const get = async (req, res) => {
  const supabase = CreateSupabaseWithAdmin();

  const { data, error } = await supabase.storage
    .from('images')
    .remove(['52e01419-e905-407a-8933-9227729d3147/mDUpfb.png']);
  console.log(data, error);
  res.status(200).json({ data, error });
};

export default handler({ get });
