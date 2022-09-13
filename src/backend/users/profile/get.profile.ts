import { CreateSupabaseClient, supabase } from '~/backend/supabase';
type Request = UsersApi.Post.Request;
type Response = UsersApi.Post.Response | any;

export const get: Handler.Callback<Request, Response> = async (req, res) => {
  console.log('cookies', req.headers);
  // const supabase = CreateSupabaseClient(req.cookies['sb-access-token']);
  // const { user, token } = await supabase.auth.api.getUserByCookie(req);

  // const { data: profile, error } = await supabase
  //   .from('profile')
  //   .select('*')
  //   .eq('id', user.id)
  //   .single();

  return res.status(200).json({});
};
