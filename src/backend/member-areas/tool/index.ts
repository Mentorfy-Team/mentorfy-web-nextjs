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
    delete tool.type;
    // Se o id não for uuid, então é um novo registro
    if (tool.id.length <= 10) {
      const { data: memberAreaTool, error } = await supabase
        .from('member_area_tool')
        .insert({ ...data, id: null });

      createdTools.push(memberAreaTool);
    } else {
      // Se o id for uuid, então é um registro existente
      const { data: memberAreaTool, error } = await supabase
        .from('member_area_tool')
        .update(data)
        .match({ member_area: tool.member_area });

      updatedTools.push(memberAreaTool);
    }
  }
  return res.status(200).json({});
};
