import { SupabaseServer } from '~/backend/supabase';

export const put = async (req, res) => {
  const supabase = SupabaseServer(req, res);
  const { data: certificate, error } = await supabase
    .from('product')
    .update({
      certificate: {
        title: req.body.title,
        url: req.body.url,
        student: req.body.student,
        course: req.body.course,
      },
    })
    .eq('id', req.body.product_id);

  if (error) {
    return res.status(400).json({
      error: 'Não foi possível salvar o seu certificado',
    });
  }

  return res.status(200).json(certificate);
};
