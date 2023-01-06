import { SupabaseServer } from '../../../supabase';
import { NextApiResponse } from 'next';
import { CreateCertificate } from '~/backend/repositories/member_area';

export const get = async (req, res: NextApiResponse) => {
  const supabase = SupabaseServer(req, res);

  const { data: product, error } = await supabase
    .from('product')
    .select('*, profile(*)')
    .eq('id', req.query.pid)
    .single();

  // get session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profile')
    .select('*')
    .eq('id', req.query.cid)
    .single();

  let { data: client_product } = await supabase
    .from('client_product')
    .select('*')
    .eq('product_id', req.query.pid)
    .eq('client_id', req.query.cid)
    .single();

  let date = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  if (product.owner === profile.id) {
    if (!client_product) {
      client_product = {
        finishedAt: date,
      } as any;
    }
  }

  if (!client_product?.finishedAt) {
    if (client_product) {
      await supabase
        .from('client_product')
        .update({ finishedAt: date })
        .eq('id', client_product.id)
        .single();
    }
  } else {
    date = client_product?.finishedAt;
  }

  const certificateUrl = (product.certificate as any).url as string;
  const texts: Pick<ProductTypes.Certificate, 'course' | 'student'> = {
    course: {
      name: {
        text: product.title,
      },
      owner: {
        text: (product.profile as any).name,
      },
    },
    student: {
      name: {
        text: profile.name,
      },
      document: req.query.doc
        ? {
            text: formartCPForCNPJ(req.query.doc),
          }
        : null,
      finishedAt: {
        text: date,
      },
    },
  };

  const certificatePosition = product.certificate as ProductTypes.Certificate;

  const merge = mergeDeep(certificatePosition, texts);

  if (certificateUrl.includes('.pdf')) {
    return res
      .status(200)
      .send(
        'O certificado precisa estar no formato de imagem nas configuracoes da mentoria.',
      );
  }

  try {
    const pdfData = await CreateCertificate({
      certificate: certificateUrl,
      texts: merge,
      res,
    });
    const fileName =
      product.title.replace(/ /g, '_') + '_' + profile.name.replace(/ /g, '_');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + `${fileName}` + '.pdf',
    );

    return res.status(200).send(pdfData);
  } catch (error) {
    return res.status(200).send(error);
  }
};

const formartCPForCNPJ = (cpfOrCnpj: string) => {
  if (cpfOrCnpj.length === 11) {
    return formartCPF(cpfOrCnpj);
  } else {
    return formartCNPJ(cpfOrCnpj);
  }
};

const formartCPF = (cpf: string) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const formartCNPJ = (cnpj: string) => {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
