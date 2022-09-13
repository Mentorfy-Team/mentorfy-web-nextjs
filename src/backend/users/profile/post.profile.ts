import { CreateSupabaseClient, supabase } from '~/backend/supabase';
type Request = UsersApi.Post.Request;
type Response = UsersApi.Post.Response | any;

export const get: Handler.Callback<Request, Response> = async (req, res) => {
  console.log('cookies', req.headers);

  const { user, token } = await supabase.auth.api.getUserByCookie(req);

  const { data: profile, error } = await supabase
    .from('profile')
    .update(req.body)
    .match({id: user.id});

  return res.status(200).json({});
};
