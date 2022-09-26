import { CreateSupabaseWithAuth } from '~/backend/supabase';
type Request = AuthApi.Post.Request;
type Response = AuthApi.Post.Response;

export const get: Handler.Callback<Request, Response> = async (req, res) => {
  const supabase = CreateSupabaseWithAuth(req);
  const { error } = await supabase.auth.signOut();
  supabase.auth.api.deleteAuthCookie(req, res, {
    redirectTo: '/',
  });
};
