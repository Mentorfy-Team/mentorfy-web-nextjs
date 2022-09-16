import { nanoid } from 'nanoid';
import { CreateSupabaseWithAuth } from '~/backend/supabase';

type GetRequest = ProductApi.Get.Request;
type GetResponse = ProductApi.Get.Response | any;

type PostRequest = ProductApi.Post.Request;
type PostResponse = ProductApi.Post.Response | any;

export const get: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = CreateSupabaseWithAuth(req);
  const { data: product, error } = await supabase
    .from('product')
    .select('*')
    .eq('id', req.query.id)
    .single();

  return res.status(200).json({
    product,
    error: error?.message,
  });
};

export const post: Handler.Callback<PostRequest, PostResponse> = async (
  req,
  res,
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const supabase = CreateSupabaseWithAuth(req);
  const { user } = await supabase.auth.api.getUserByCookie(req);

  const { error, data } = await supabase
    .from('product')
    .insert({
      ...req.body,
      owner: user.id,
      refeerer: nanoid(6),
    })
    .single();

  console.log(data);
  res.status(200).json({ product: data, error: error?.message });
};
