import { DnDRow } from '~/components/modules/DragNDrop';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from './HttpClient';

export const UpdateMemberAreaTools = async (id: string, tools: DnDRow[]) => {
  // para cada tool salva a ordem na propriedade order
  console.log('tools', tools[2].title, tools[2].data);
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
