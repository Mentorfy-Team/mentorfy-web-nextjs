import { supabase } from '~/helpers/supabase';
type Request = UsersApi.Post.Request;
type Response = UsersApi.Post.Response;

export const post: Handler.Callback<Request, Response> = async (req, res) => {
  const { email, password } = req.body;

  const { session, user } = await supabase.auth.signIn({
    email,
    password,
  });

  const { data: profile } = await supabase
    .from('profile')
    .select('*')
    .eq('id', user.id)
    .single();

  res.status(200).json({
    session: {
      ...session,
      user: {
        ...session.user,
        ...profile,
      },
    },
    error: null,
  });
};
