import fs from 'fs';
import formidable from 'formidable';
import { CreateSupabaseWithAdmin } from '~/backend/supabase';
type Request = UploadApi.Post.Request;
type Response = UploadApi.Post.Response;

type file = {
  filepath: string;
  hash: string;
  hashAlgorithm: boolean;
  lastModifiedDate: Date;
  mimetype: string;
  newFilename: string;
  originalFilename: string;
  size: number;
};

export const post: Handler.Callback<Request, Response> = async (req, res) => {
  const form = new formidable.IncomingForm();
  const supabase = CreateSupabaseWithAdmin(req);
  const uploadFile = async () => {
    // eslint-disable-next-line
    return new Promise<{ success: boolean } | string>((resolve, reject) => {
      form.parse(req, async function (err, fields, files) {
        let filepath = `${req.query.id}/${(files.file as any).newFilename}${
          (files.file as any).originalFilename
        }`;
        filepath = filepath.replace(/\s/g, '-');
        const rawData = fs.readFileSync((files.file as any).filepath);
        const { data, error } = await supabase.storage
          .from('files')
          .upload(filepath, rawData, {
            contentType: (files.file as any).mimetype,
          });

        if (error || err) {
          return reject({ success: false });
        }

        resolve(`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/` + data.Key);
      });
    });
  };

  try {
    const result = await uploadFile();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({ success: false });
  }
};

export const del: Handler.Callback<Request, Response> = async (req, res) => {
  const supabase = CreateSupabaseWithAdmin(req);

  const { data, error } = await supabase.storage
    .from('images')
    .remove(req.body);

  res.status(200).json({
    error: error?.message,
  });
};
