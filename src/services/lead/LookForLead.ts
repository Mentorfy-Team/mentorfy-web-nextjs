import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

type TextProps = {
  email: string;
};

export const LookForLead = async (
  data: TextProps,
): Promise<ClientTypes.Lead> => {
  try {
    const response = await HttpClient.get<any>(
      ApiRoutes.lead_approval + '?email=' + data.email,
    );
    return response.data;
  } catch (error: any) {
    return null;
  }
};
