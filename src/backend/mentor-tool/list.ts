import { CreateSupabaseWithAuth } from '~/backend/supabase';

export const get = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const supabase = CreateSupabaseWithAuth(req);

  const { data: tools } = await supabase
    .from<ProductApi.Product>('mentor_tool')
    .select('*');
  // TODO: Adicionar log de erros detalhados

  res.status(200).json(tools);
};
