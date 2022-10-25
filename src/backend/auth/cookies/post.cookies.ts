import { SupabaseWithouAuth } from '~/backend/supabase';
type Request = AuthApi.Post.Request;
type Response = AuthApi.Post.Response;

export const post: Handler.Callback<Request, Response> = async (req, res) => {
  SupabaseWithouAuth.auth.api.setAuthCookie(req, res);
};
