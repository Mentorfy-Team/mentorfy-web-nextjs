import { LogHistory } from '~/backend/helpers/LogHistory';
import { CreateSupabaseWithAuth } from '../../supabase';

type GetRequest = MemberAreaTypes.Post.Request;
type GetResponse = MemberAreaTypes.Post.Response | any;

export const get: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = CreateSupabaseWithAuth(req);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: tools, error: errorm } = await supabase
    .from('member_area_tool')
    .select('*')
    .eq('member_area', req.query.id);

  // if tool is not found, return 404
  if (errorm || !tools || tools.length === 0) {
    return res.status(200).json({ error: 'Empty Area' });
  }
  // for each tool, get the user input
  const { data: userInputs, error: erroru } = await supabase
    .from('client_input_tool')
    .select('*')
    .in(
      'member_area_tool_id',
      tools?.map((tool) => tool.id),
    )
    .match({
      profile_id: user.id,
    });

  return res.status(200).json(userInputs);
};

export const post: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = CreateSupabaseWithAuth(req);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const tool_id = req.body.tool_id; // tool que está sendo respondida pelo usuário

  const client_input = req.body.client_input;

  delete (client_input as any).toRemove;

  const isUUID =
    client_input.id &&
    (client_input.id + '').length > 6 &&
    (client_input.id + '').includes('-');
  const client_input_id = isUUID ? client_input.id : null;

  const { data: product, error: errorProduct } = await supabase
    .from('product')
    .select('id, title')
    .eq('id', req.body.member_area_id)
    .single();

  const { data: tool, error: errorTool } = await supabase
    .from('member_area_tool')
    .select('id, title')
    .eq('id', tool_id)
    .single();

  if (client_input.delete) {
    if (isUUID) {
      delete client_input.delete;
      const { error } = await supabase
        .from('client_input_tool')
        .delete()
        .match({ id: client_input_id });
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
    }
  } else {
    // Se o id não for uuid, então é um novo registro
    if (!isUUID) {
      delete client_input.id;
      const { data: memberAreaUserInput, error } = await supabase
        .from('client_input_tool')
        .insert({
          ...client_input,
          profile_id: user.id,
          member_area_tool_id: tool_id,
        })
        .select()
        .single();

      if (!error && !errorProduct) {
        // ? Registra que o cliente interagiu com uma mentoria
        await LogHistory.Create(
          user.id,
          320,
          `Interagiu ou concluiu uma etapa na mentoria: ${product?.title} - ${tool?.title}`,
          0,
          { id: product?.id },
        );
      }

      return res.status(200).json(memberAreaUserInput);
    } else {
      // Se o id for uuid, então é um registro existente
      delete client_input.id;
      if ((client_input.data as any)?.length === 0) {
        client_input.data = null;
      }
      const { data: memberAreaUserInput, error } = await supabase
        .from('client_input_tool')
        .update(client_input)
        .match({ id: client_input_id });

      if (!error && !errorProduct) {
        // ? Registra que o cliente interagiu com uma mentoria
        await LogHistory.Create(
          user.id,
          320,
          `Interagiu ou concluiu uma etapa na mentoria: ${product?.title} - ${tool?.title}`,
          0,
          {
            id: product?.id,
            tool_id: tool?.id,
          },
        );
      }

      return res.status(200).json(memberAreaUserInput);
    }
  }
};
