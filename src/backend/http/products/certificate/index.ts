import { SupabaseServer } from '~/backend/supabase';

type PostRequest = ProductApi.Post.Request;
type PostResponse = ProductApi.Post.Response | any;

export const put: Handler.Callback<PostRequest, PostResponse> = async (
  req,
  res,
) => {
  const supabase = SupabaseServer(req, res);
  // console.log(req);
  const { data: certificate, error } = await supabase
    .from('product')
    .update({
      certificate: {
        title: req.body.title,
        url: req.body.url,
        default_certificate: req.body.default_certificate,
        student: req.body.student,
        course: req.body.course,
      },
    })
    .eq('id', req.body.product_id);

  if (error) {
    return res.status(400).json({
      error: 'Não foi possível salvar o seu certificado'
    });
  }

  return res.status(200).json(certificate);

};