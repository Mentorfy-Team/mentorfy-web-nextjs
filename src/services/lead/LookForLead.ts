import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

type TextProps = {
  email: string;
};

export const LookForLead = async (data: TextProps): Promise<boolean> => {
  try {
    const response = await HttpClient.get<any>(
      ApiRoutes.lead_approval + '?email=' + data.email,
    );
    return !!response.data.email;
  } catch (error: any) {
    return null;
  }
};
