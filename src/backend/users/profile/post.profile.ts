import { CreateSupabaseWithAuth, SupabaseWithouAuth } from '~/backend/supabase';
type Request = ProfileApi.Post.Request;
type Response = ProfileApi.Post.Response | any;

export const get: Handler.Callback<Request, Response> = async (req, res) => {
  const { user, token } = await SupabaseWithouAuth.auth.api.getUserByCookie(
    req,
  );
  const supabase = CreateSupabaseWithAuth(token);

  const errors = [];
  if (req.body.address) {
    const { error } = await supabase
      .from('address')
      .update(req.body.address)
      .match({ id: user.id });
    if (error) errors.push(error);
  }

  if (req.body.user) {
    const { error } = await supabase.auth.api.updateUserById(
      user.id,
      req.body.user,
    );
    if (error) errors.push(error);
  }

  if (req.body.profile) {
    const { error } = await supabase
      .from('profile')
      .update(req.body.profile)
      .match({ id: user.id });
    if (error) errors.push(error);
  }

  return res.status(200).json({ errors: errors });
};
