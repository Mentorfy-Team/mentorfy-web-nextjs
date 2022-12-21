import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const GetPlans = async (): Promise<Checkout.Plan[]> => {
  try {
    const response = await HttpClient.get<Checkout.Plan[]>(ApiRoutes.checkout);

    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao salvar o certificado',
    } as any;
  }
};
