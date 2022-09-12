import { CreateSupabaseClient } from '~/backend/supabase';

export const get = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const supabase = CreateSupabaseClient(req.cookies['sb-access-token']);

  //supabase...

  ///supabase....
  res.status(200);
};
