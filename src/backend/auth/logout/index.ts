import { SupabaseServer } from '~/backend/supabase';
type Request = AuthApi.Post.Request;
type Response = AuthApi.Post.Response;

export const get: Handler.Callback<Request, Response> = async (req, res) => {
  const supabase = SupabaseServer(req);
  const { error } = await supabase.auth.signOut();

  return res.status(200).json({ error: error?.message });
};
