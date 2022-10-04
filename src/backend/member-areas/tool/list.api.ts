import { CreateSupabaseWithAuth } from '../../supabase';

type GetRequest = ProductApi.List.Request;
type GetResponse = ProductApi.List.Response | any;

export const get: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = CreateSupabaseWithAuth(req);

  const { data: tools, error } = await supabase
    .from('member_area_tool')
    .select('*, member_area!member_area_id_fkey(id), mentor_tool!mentor_tool_id_fkey(id)')
    .eq('member_area_id', req.query.id)

  // TODO: Adicionar log de erros detalhados
  console.log(error)
  return res.status(200).json(tools);
};
