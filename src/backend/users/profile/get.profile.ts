import { CreateSupabaseWithAuth } from '~/backend/supabase';
type Request = ProfileApi.Get.Request;
type Response = ProfileApi.Get.Response | any;

export const get: Handler.Callback<Request, Response> = async (req, res) => {
  const supabase = CreateSupabaseWithAuth(req);
  const { user, token } = await supabase.auth.api.getUserByCookie(req);
  const result = {};

  const { data: profile, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', user.id)
    .single();

  result['profile'] = profile;

  if (req.query?.withAddress) {
    const { data: address, error } = await supabase
      .from('address')
      .select('*')
      .eq('id', user.id)
      .single();
    result['address'] = address;
  }
  return res.status(200).json(result);
};
