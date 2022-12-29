import { SupabaseServer } from '@app/backend/supabase';

export const get = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const supabase = SupabaseServer(req, res);

  if (req.query.id) {
    const { data: member_area, error: mbError } = await supabase
      .from('member_area')
      .select('id, member_area_type(tooltypes)')
      .eq('id', req.query.id)
      .single();

    const { data: tools, error } = await supabase
      .from('mentor_tool')
      .select('*')
      .in('id', member_area?.member_area_type['tooltypes'] || []);

    if (error) {
      res.statusCode = 500;
      res.end(error.message);
      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify(tools));
    return;
  } else {
    const { data: tools } = await supabase.from('mentor_tool').select('*');
    // TODO: Adicionar log de erros detalhados

    res.status(200).json(tools);
  }
};
