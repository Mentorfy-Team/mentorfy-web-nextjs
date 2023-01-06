import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from './HttpClient';

export const CloneProduct = async (data: object) => {
  try {
    const response = await HttpClient.get(ApiRoutes.products_clone, {
      params: data,
    });

    return response.data;
  } catch (error) {
    return {
      error: 'Erro ao clonar modelo',
    };
  }
};
