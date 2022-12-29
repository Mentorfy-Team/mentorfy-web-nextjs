import { ApiRoutes } from '@app/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

type TextProps = {
  id: string;
};

export const GetCertificate = async (data: TextProps): Promise<string> => {
  try {
    const response = await HttpClient.get<any>(
      ApiRoutes.member_areas_certificate + '/' + data.id,
    );
    return response.data;
  } catch (error: any) {
    return {
      error: error.message,
    } as any;
  }
};
