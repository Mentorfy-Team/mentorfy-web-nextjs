import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../../HttpClient';

type Props = {
  product_id: string;
  list: {
    type: 'kiwify' | 'eduzz' | 'hotmart' | 'green' | string;
    token: string;
  }[];
};

export const UpdateIntegrations = async (data: Props): Promise<boolean> => {
  try {
    const response = await HttpClient.patch<any>(
      ApiRoutes.member_areas_integration,
      data,
    );
    return true;
  } catch (error: any) {
    return error.message as any;
  }
};
