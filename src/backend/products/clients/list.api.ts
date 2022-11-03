import { CreateSupabaseWithAuth } from '~/backend/supabase';
import { OrganizeTools } from '~/helpers/OrganizeTools';

export const get = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const supabase = CreateSupabaseWithAuth(req);

  const { data: tools, error: errorTools } = await supabase
    .from<MentorTools.ToolData>('member_area_tool')
    .select('*')
    .eq('member_area', req.query.id);

  const toolsList = tools?.map((tool) => {
    tool['type'] = (tool as any).mentor_tool;
    return tool;
  });

  const { data: relations } = await supabase
    .from('client_product')
    .select('*')
    .eq('product_id', req.query.id);

  const { data: clients } = await supabase
    .from('profile')
    .select('*')
    .in(
      'id',
      relations.map((relation) => relation.user_id),
    );

  const { data: userInputs, error: erroru } = await supabase
    .from<MemberAreaTypes.UserInput>('client_input_tool')
    .select('*')
    .in(
      'profile_id',
      clients?.map((cl) => cl.id),
    )
    .in(
      'member_area_tool_id',
      toolsList?.map((tool) => tool.id),
    );

  const clientWithInputs = clients.map((cl) => {
    return {
      ...cl,
      since: relations.find((rel) => rel.user_id === cl.id).created_at,
      progress: parseFloat(
        (
          (userInputs.filter(
            (input) =>
              !!toolsList.find((tl) => tl.id === input.member_area_tool_id),
          ).length /
            toolsList.filter((t) => t.type !== 0).length) *
          100
        ).toFixed(2),
      ),
      inputs: userInputs.filter((inp) => inp.profile_id === cl.id) || [],
    };
  });

  let orgSteps = OrganizeTools(toolsList);

  const checkClientStep = [];
  orgSteps = orgSteps.map((step) => {
    return {
      ...step,
      rows: step.rows.map((row) => {
        return {
          ...row,
          progress:
            (clientWithInputs.length -
              clientWithInputs.filter((cl) => {
                return !cl.inputs.some(
                  (inp) => inp.member_area_tool_id === row.id,
                );
              }).length) *
            100,
          clients: clientWithInputs.filter((cl) => {
            return cl.inputs.some((inp) => inp.member_area_tool_id === row.id);
          }),
        };
      }),
      currentClients: clientWithInputs.filter((cl) => {
        const hasInput = cl.inputs.some(
          (inp) =>
            !!step.rows.find((row) => row.id === inp.member_area_tool_id),
        );
        if (hasInput) {
          // adiciona o cliente na lista de clientes que já passaram por essa etapa, se não estiver lá
          if (!checkClientStep.some((c) => c.id === cl.id)) {
            checkClientStep.push(cl);
            return true;
          }
        }
        return false;
      }),
    };
  });

  // TODO: Adicionar log de erros detalhados
  res.status(200).json({
    clients: clientWithInputs,
    tools,
    result: orgSteps,
  });
};