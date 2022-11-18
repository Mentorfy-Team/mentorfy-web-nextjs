import { CreateSupabaseWithAuth } from '../../supabase';

type GetRequest = ProductApi.List.Request;
type GetResponse = ProductApi.List.Response | any;

export const get: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = CreateSupabaseWithAuth(req);

  const { data: tools } = await supabase
    .from('member_area_tool')
    .select('*')
    .eq('member_area', req.query.id);
  // member_area!member_area_fkey (id), mentor_tool_id!mentor_tool_id_fkey (id)
  // TODO: Adicionar log de erros detalhados
  const toolsList = tools?.map((tool) => {
    tool['type'] = (tool as any).mentor_tool;
    return tool;
  });

  return res.status(200).json(toolsList);
};
