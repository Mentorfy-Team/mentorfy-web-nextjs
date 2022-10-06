import { SupabaseWithouAuth, CreateSupabaseWithAuth } from '~/backend/supabase';
type Request = UsersApi.Post.Request;
type Response = UsersApi.Post.Response;
import { nanoid } from 'nanoid';
import { fixBase64 } from '~/backend/products';
import { IncomingForm } from 'formidable';

const GetFromForm = async (req) => {
  const data:any = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  })
  return data?.files?.inputFile.path;
}


export const post: Handler.Callback<Request, Response> = async (req, res) => {
  const file = GetFromForm(req);
  if(!file) return res.status(400).json({error: 'No file found'});
  const supabase = CreateSupabaseWithAuth(req);

  const { user, token } = await SupabaseWithouAuth.auth.api.getUserByCookie(req);

  const { data, error } = await supabase.storage
      .from('images')
      .upload(
        `${user.id}/${nanoid(6)}.${(req.body.avatar as any).type}`,
        fixBase64((req.body.avatar as any).file),
        {
          cacheControl: '3600',
          upsert: true,
          contentType: `image/${(req.body.avatar as any).type}`,
        },
      );

    if (!error && req.body.old_avatar) {
      const { data, error } = await supabase.storage
        .from('images')
        .remove([req.body.old_avatar.split('images/')[1]]);
    }
    Object.assign(toUpdate, {
      avatar: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/` + data.Key,
    });

  res.status(200).json({
    user,
    error: error?.message,
  });
};