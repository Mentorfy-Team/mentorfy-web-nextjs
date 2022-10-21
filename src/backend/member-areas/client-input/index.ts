import { CreateSupabaseWithAuth } from '../../supabase';

type GetRequest = MemberAreaTypes.Post.Request;
type GetResponse = MemberAreaTypes.Post.Response | any;

export const post: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = CreateSupabaseWithAuth(req);
  const user = supabase.auth.user();
  const id = req.body.id.length > 6 ? req.body.id : null;
  const tool_id = req.body.tool_id;
  const user_input = req.body.data;
  delete (user_input as any).toRemove;

  const isUUID = id && (id + '').length > 6 && (id + '').includes('-');
  const user_input_id = isUUID ? id : null;

  // Se o id for maior que 6, é um id do supabase e devemos remover se o delete for true
  if (user_input.delete) {
    if (isUUID) {
      delete user_input.delete;
      const { error } = await supabase
        .from('client_input_tool')
        .delete()
        .match({ id: user_input_id });
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
    }
  }

  // Se o id não for uuid, então é um novo registro
  if (!isUUID) {
    delete user_input.id;
    const { data: memberAreaUserInput, error } = await supabase
      .from('client_input_tool')
      .insert({
        ...user_input,
        profile_id: user.id,
        member_area_tool_id: tool_id,
      });

    return res.status(200).json(memberAreaUserInput);
  } else {
    // Se o id for uuid, então é um registro existente
    delete user_input.id;
    if ((user_input.data as any)?.length === 0) {
      user_input.data = null;
    }
    const { data: memberAreaUserInput, error } = await supabase
      .from('client_input_tool')
      .update(user_input)
      .match({ id: user_input_id });

    return res.status(200).json(memberAreaUserInput);
  }
};
