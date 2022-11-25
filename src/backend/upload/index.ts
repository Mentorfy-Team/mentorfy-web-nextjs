import fs from 'fs';
import formidable from 'formidable';
import { SupabaseAdmin } from '~/backend/supabase';
import { LogHistory } from '../helpers/LogHistory';
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
  const supabase = SupabaseAdmin(req);
  let file_name = '';
  const uploadFile = async () => {
    // eslint-disable-next-line
    return new Promise<{ success: boolean } | string>((resolve, reject) => {
      form.parse(req, async function (err, fields, files) {
        file_name = (files.file as any).originalFilename;
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

        resolve(`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/` + data.path);
      });
    });
  };

  try {
    const result = await uploadFile();
    if (result) {
      // Registra que o usuário fez upload de um arquivo
      LogHistory.Create(
        req.query.id as string,
        110,
        `Fez uma upload de arquivo: ${file_name}`,
        0,
        {
          file_link: result,
        },
      );
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({ success: false });
  }
};

export const del: Handler.Callback<Request, Response> = async (req, res) => {
  const supabase = SupabaseAdmin(req);
  if (req.body.length <= 0) return res.status(200).send({ success: true });
  const fixUrls = req.body.map((item) => {
    const url = item.replace(
      process.env.NEXT_PUBLIC_SUPABASE_STORAGE + '/files/',
      '',
    );
    return url;
  });
  const { data, error } = await supabase.storage.from('files').remove(fixUrls);

  res.status(200).json({
    error: error?.message,
  });
};
