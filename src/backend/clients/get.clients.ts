import { CreateSupabaseWithAuth } from '~/backend/supabase';

export const get = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const supabase = CreateSupabaseWithAuth(req.cookies['sb-access-token']);

  //SupabaseWithouAuth...

  ///SupabaseWithouAuth....
  res.status(200);
};
