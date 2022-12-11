type GetRequest = ProductApi.Get.Request;
type GetResponse = ProductApi.Get.Response | any;

type PostRequest = ProductApi.Post.Request;
type PostResponse = ProductApi.Post.Response | any;

import { decode } from 'base64-arraybuffer';
import { nanoid } from 'nanoid';
import { SupabaseServer } from '~/backend/supabase';
import { LogHistory } from '~/backend/helpers/LogHistory';

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
  if (!req.query.id) {
    return res.status(200).send('Done');
  }

  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: product, error } = await supabase
    .from('product')
    .select('*, member_area(*, member_area_type(*))')
    .eq('id', req.query.id)
    .single();

  // Registra a visualização do produto/mentoria, contanto que o usuário não seja o dono do produto
  if (user?.id !== product?.owner) {
    await LogHistory.Create(
      user?.id,
      100,
      `Visualizou o produto: ${product?.title}`,
      0,
      {
        product_id: product?.id,
      },
    );
    await LogHistory.Create(
      req.query.id,
      100,
      `Visualizou a mentoria: ${product?.title}`,
      1,
      {
        user_id: user?.id,
      },
    );
  }

  if (error || !product || !product.id) {
    return res.status(404).json({
      error: JSON.stringify(error),
    });
  }

  return res.status(200).json({
    product,
  });
};

export const del: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = SupabaseServer(req, res);
  // find relations

  const { data: relations } = await supabase
    .from('client_product')
    .select('*')
    .eq('product_id', req.query.id);

  if (relations.length > 0) {
    if (relations.find((r) => r.approved && r.subscription)) {
      return res.status(400).json({
        error:
          'You can not delete this product because it has relations with clients',
      });
    } else {
      await supabase
        .from('client_product')
        .delete()
        .in(
          'id',
          relations.map((r) => r.id),
        );
    }
  }

  await supabase.from('product').delete().eq('id', req.query.id);

  await supabase.from('member_area').delete().eq('id', req.query.id);

  const { data } = await supabase
    .from('member_area_tool')
    .select('id')
    .eq('member_area', req.query.id);

  await supabase
    .from('client_input_tool')
    .delete()
    .in(
      'member_area_tool_id',
      data.map((d) => d.id),
    );

  await supabase
    .from('member_area_tool')
    .delete()
    .eq('member_area', req.query.id);

  const { data: files } = await supabase
    .from('member_area_files')
    .select('*')
    .eq('ref_id', req.query.id);

  await supabase.storage.from('files').remove(files.map((f) => f.id));

  return res.status(200).json({
    message: 'Product deleted',
  });
};

export const post: Handler.Callback<PostRequest, PostResponse> = async (
  req,
  res,
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error, data } = await supabase
    .from('product')
    .insert({
      ...req.body,
      owner: user.id,
      refeerer: nanoid(6),
    })
    .select()
    .single();

  const { error: errorm } = await supabase
    .from('member_area')
    .insert({
      id: data.id,
      type_id: parseInt(data.deliver),
    })
    .single();

  await supabase
    .from('product')
    .update({
      member_area: data.id,
    })
    .eq('id', data.id);

  res.status(200).json({ product: data, error: error?.message });
};

export const put: Handler.Callback<PostRequest, PostResponse> = async (
  req,
  res,
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const supabase = SupabaseServer(req, res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

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

    await supabase.from('member_area_files').insert({
      ref_id: req.body.id,
      url: data.path,
    });

    if (!error && req.body.old_banner_url) {
      const { data, error } = await supabase.storage
        .from('images')
        .remove([req.body.old_banner_url.split('images/')[1]]);

      await supabase
        .from('member_area_files')
        .delete()
        .eq('url', req.body.old_banner_url.split('images/')[1]);
    }
    Object.assign(toUpdate, {
      banner_image:
        `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/images/` + data.path,
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

    await supabase.from('member_area_files').insert({
      ref_id: req.body.id,
      url: data.path,
    });

    if (!error && req.body.old_banner_url) {
      const { data, error } = await supabase.storage
        .from('images')
        .remove([req.body.old_main_url.split('images/')[1]]);

      await supabase
        .from('member_area_files')
        .delete()
        .eq('url', req.body.old_main_url.split('images/')[1]);
    }
    Object.assign(toUpdate, {
      main_image:
        `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/images/` + data.path,
    });
  }

  if (req.body.extra_image) {
    const { data, error } = await supabase.storage
      .from('images')
      .upload(
        `${req.body.id}/${nanoid(6)}.${req.body.extra_type}`,
        fixBase64(req.body.extra_image),
        {
          cacheControl: '3600',
          upsert: true,
          contentType: `image/${req.body.extra_type}`,
        },
      );

    await supabase.from('member_area_files').insert({
      ref_id: req.body.id,
      url: data.path,
    });

    if (!error && req.body.old_banner_url) {
      const { data, error } = await supabase.storage
        .from('images')
        .remove([req.body.old_extra_url.split('images/')[1]]);

      await supabase
        .from('member_area_files')
        .delete()
        .eq('url', req.body.old_extra_url.split('images/')[1]);
    }
    Object.assign(toUpdate, {
      extra_image:
        `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/images/` + data.path,
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
  if (req.body.extra) {
    Object.assign(toUpdate, { contact: req.body.contact });
  }

  const { error, data } = await supabase
    .from('product')
    .update(toUpdate)
    .match({ owner: user.id, id: req.body.id })
    .select('*')
    .single();

  res.status(200).json({ product: data, error: error?.message });
};
