import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const GetPlans = async () => {
  try {
    const response = await HttpClient.get(
      ApiRoutes.checkout,
    );

    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao salvar o certificado',
    };
  }
};
