import { CreateSupabaseWithAuth } from '../../supabase';

type GetRequest = MentorTools.Post.Request;
type GetResponse = MentorTools.Post.Response | any;

export const post: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = CreateSupabaseWithAuth(req);
  const data = req.body.data;
  const id = req.body.id.length > 6 ? req.body.id : null;
  const updatedTools = [];
  const createdTools = [];

  for (let i = 0; i < data.length; i++) {
    const tool = data[i];
    tool['mentor_tool'] = tool.type;
    delete tool.type;
    delete (tool as any).toRemove;

    const isUUID = tool.id.length > 6 && tool.id.includes('-');
    const tool_id = isUUID ? tool.id : null;

    // Se o id for maior que 6, é um id do supabase e devemos remover se o delete for true
    if (tool.delete) {
      if (isUUID) {
        delete tool.delete;
        const { error } = await supabase
          .from('member_area_tool')
          .delete()
          .match({ id: tool_id });
        if (error) {
          res.status(500).json({ error: error.message });
          return;
        }
      } else {
        continue;
      }
    }

    // Se o id não for uuid, então é um novo registro
    if (!isUUID) {
      delete tool.id;
      const { data: memberAreaTool, error } = await supabase
        .from('member_area_tool')
        .insert({ ...tool, member_area: id });

      createdTools.push(memberAreaTool);
    } else {
      // Se o id for uuid, então é um registro existente
      delete tool.id;
      if ((tool.data as any)?.length === 0) {
        tool.data = null;
      }
      const { data: memberAreaTool, error } = await supabase
        .from('member_area_tool')
        .update(tool)
        .match({ id: tool_id });

      updatedTools.push(memberAreaTool);
    }
  }
  return res.status(200).json({});
};
