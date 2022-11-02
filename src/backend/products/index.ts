type GetRequest = ProductApi.Get.Request;
type GetResponse = ProductApi.Get.Response | any;

type PostRequest = ProductApi.Post.Request;
type PostResponse = ProductApi.Post.Response | any;

import { decode } from 'base64-arraybuffer';
import { nanoid } from 'nanoid';
import { CreateSupabaseWithAuth } from '~/backend/supabase';

export function fixBase64(data) {
  return decode(
    data
      .replace('data:image/png;base64,', '')
      .replace('data:image/jpeg;base64,', '')
      .replace('data:image/jpg;base64,', '')
      .replace('data:image/webp;base64,', ''),
  );
}

export const get: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = CreateSupabaseWithAuth(req);
  const { data: product, error } = await supabase
    .from('product')
    .select('*, member_area(*)')
    .eq('id', req.query.id)
    .single();

  return res.status(200).json({
    product,
    error: error?.message,
  });
};

export const del: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = CreateSupabaseWithAuth(req);
  // find relations

  const { data: relations } = await supabase
    .from('client_product')
    .select('*')
    .eq('product_id', req.query.id);

  if (relations.length > 0) {
    return res.status(400).json({
      error:
        'You can not delete this product because it has relations with clients',
    });
  }

  await supabase.from('product').delete().eq('id', req.query.id);

  await supabase.from('member_area').delete().eq('id', req.query.id);

  return res.status(200).json({
    message: 'Product deleted',
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
    .from<ProductTypes.Product>('product')
    .insert({
      ...req.body,
      owner: user.id,
      refeerer: nanoid(6),
    })
    .single();

  const { error: errorm } = await supabase
    .from('member_area')
    .insert({
      id: data.id,
      type_id: data.deliver,
    })
    .single();

  res.status(200).json({ product: data, error: error?.message });
};

export const put: Handler.Callback<PostRequest, PostResponse> = async (
  req,
  res,
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const supabase = CreateSupabaseWithAuth(req);
  const { user } = await supabase.auth.api.getUserByCookie(req);

  const toUpdate = {};

  if (req.body.banner_image) {
    const { data, error } = await supabase.storage
      .from('images')
      .upload(
        `${req.body.id}/${nanoid(6)}.${req.body.banner_type}`,
        fixBase64(req.body.banner_image),
        {
          cacheControl: '3600',
          upsert: true,
          contentType: `image/${req.body.banner_type}`,
        },
      );

    if (!error && req.body.old_banner_url) {
      const { data, error } = await supabase.storage
        .from('images')
        .remove([req.body.old_banner_url.split('images/')[1]]);
    }
    Object.assign(toUpdate, {
      banner_image: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/` + data.Key,
    });
  }

  if (req.body.main_image) {
    const { data, error } = await supabase.storage
      .from('images')
      .upload(
        `${req.body.id}/${nanoid(6)}.${req.body.main_type}`,
        fixBase64(req.body.main_image),
        {
          cacheControl: '3600',
          upsert: true,
          contentType: `image/${req.body.main_type}`,
        },
      );
    if (!error && req.body.old_banner_url) {
      const { data, error } = await supabase.storage
        .from('images')
        .remove([req.body.old_main_url.split('images/')[1]]);
    }
    Object.assign(toUpdate, {
      main_image: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/` + data.Key,
    });
  }

  if (req.body.title) {
    Object.assign(toUpdate, { title: req.body.title });
  }
  if (req.body.price) {
    Object.assign(toUpdate, { price: req.body.price });
  }
  if (req.body.deliver) {
    Object.assign(toUpdate, { deliver: req.body.deliver });
  }
  if (req.body.video) {
    Object.assign(toUpdate, { video: req.body.video });
  }
  if (req.body.description) {
    Object.assign(toUpdate, { description: req.body.description });
  }
  if (req.body.extra) {
    Object.assign(toUpdate, { extra: req.body.extra });
  }

  const { error, data } = await supabase
    .from('product')
    .update(toUpdate)
    .match({ owner: user.id, id: req.body.id });

  res.status(200).json({ product: data, error: error?.message });
};
