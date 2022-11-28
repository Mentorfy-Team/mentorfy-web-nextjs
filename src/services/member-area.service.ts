import { GroupTools } from '~/components/modules/DragNDrop';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { UserInput } from '~/layouts/mentorado/kanban';
import { DataUtil } from '~/shared/utils';
import { HttpClient } from './HttpClient';

export const UpdateMemberAreaTools = async (
  id: string,
  stepsToUpdate: GroupTools[],
) => {
  // para cada tool salva a ordem na propriedade order
  const tools: MentorTools.ToolData[] = [];

  const steps = [];

  for (let i = 0; i < stepsToUpdate.length; i++) {
    const step = DataUtil.deepClone(stepsToUpdate[i]);
    delete step.rows;

    tools.push(step as any);

    for (let e = 0; e < stepsToUpdate[i].rows?.length; e++) {
      const tool = stepsToUpdate[i].rows[e];
      tools.push(tool);

      for (let o = 0; o < tool.rows?.length; o++) {
        const subtool = tool.rows[o];
        tools.push(subtool);
      }
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
