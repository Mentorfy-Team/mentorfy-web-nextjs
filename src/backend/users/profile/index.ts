import { AdminUserAttributes } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';
import { fixBase64 } from '~/backend/products';
import {
  CreateSupabaseWithAdmin,
  CreateSupabaseWithAuth,
  SupabaseWithoutAuth,
} from '~/backend/supabase';
type GetRequest = ProfileApi.Get.Request;
type GetResponse = ProfileApi.Get.Response | any;

type PostRequest = ProfileApi.Post.Request;
type PostResponse = ProfileApi.Post.Response | any;

export const get: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = CreateSupabaseWithAuth(req);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const result = {};

  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const id = req.query.id || user.id;

  const { data: profile, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', id)
    .single();

  result['profile'] = profile;
  result['user'] = user;

  if (req.query?.withAddress) {
    const { data: address, error } = await supabase
      .from('address')
      .select('*')
      .eq('id', id)
      .single();
    result['address'] = address;
  }
  return res.status(200).json(result);
};

export const post: Handler.Callback<PostRequest, PostResponse> = async (
  req,
  res,
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const {
    data: { user },
  } = await SupabaseWithoutAuth.auth.getUser();
  const supabase = CreateSupabaseWithAuth(req);

  const errors = [];
  const toUpdate = {};

  if (req.body.avatar) {
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
      avatar: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/images/` + data.path,
    });
  }

  if (req.body.address) {
    const { error } = await supabase
      .from('address')
      .upsert({ ...req.body.address, id: user.id })
      .match({ id: user.id });
    if (error) errors.push(error);
  }

  if (req.body.user) {
    const supabaseAdmin = CreateSupabaseWithAdmin(req);
    const { error } = await supabaseAdmin.auth.updateUser(
      req.body.user as AdminUserAttributes,
    );
    if (error) errors.push(error);
  }

  if (
    req.body.profile ||
    req.body.user?.phone ||
    req.body.user?.email ||
    req.body.avatar
  ) {
    const { error } = await supabase
      .from('profile')
      .update({ ...req.body.profile, ...req.body.user, ...toUpdate })
      .match({ id: user.id });
    if (error) errors.push(error);
  }

  return res.status(200).json({ errors: errors });
};
