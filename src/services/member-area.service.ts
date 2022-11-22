import { GroupTools } from '~/components/modules/DragNDrop';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { UserInput } from '~/layouts/mentorado/kanban';
import { DataUtil } from '~/shared/utils';
import { HttpClient } from './HttpClient';

export const UpdateMemberAreaTools = async (
  id: string,
  steps: GroupTools[],
) => {
  // para cada tool salva a ordem na propriedade order
  const tools: MentorTools.ToolData[] = [];

  for (let i = 0; i < steps.length; i++) {
    const step = DataUtil.deepClone(steps[i]);
    delete step.rows;

    step['type'] = '0';
    tools.push(step as any);

    for (let e = 0; e < steps[i].rows.length; e++) {
      const tool = steps[i].rows[e];
      tools.push(tool);
    }
  }

  tools.forEach((tool, index) => {
    tool.order = index;
  });
  try {
    const response = await HttpClient.post<ProductApi.Post.Response>(
      ApiRoutes.member_areas_tool,
      { data: tools, id },
    );
    if (response.data.error) {
      return {
        error: response.data.error,
      };
    }
    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao atualizar as etapas',
    };
  }
};

export const InputUserMemberArea = async (
  tool_id: string,
  client_input: Partial<UserInput> & { delete?: boolean },
  member_area_id,
) => {
  try {
    const response = await HttpClient.post<ProductApi.Post.Response>(
      ApiRoutes.member_areas_client_input,
      {
        client_input: {
          ...client_input,
        },
        tool_id,
        member_area_id,
      },
    );
    if (response.data.error) {
      return {
        error: response.data.error,
      };
    }
    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao atualizar as etapas',
    };
  }
};
