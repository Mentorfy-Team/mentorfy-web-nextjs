import { ApiRoutes } from '@app/consts/routes/api.routes';
import { HttpClient } from './HttpClient';

export const GetProductLogo = async (
  refeerer,
): Promise<{
  main_image: string;
  title: string;
  id: string;
}> => {
  try {
    const response = await HttpClient.get<any>(ApiRoutes.products_image, {
      params: {
        refeerer,
      },
    });

    return response.data.product;
  } catch (error: any) {
    return {
      error: error.message,
    } as any;
  }
};
