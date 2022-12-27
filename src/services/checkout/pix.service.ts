import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const SendPixPayment = async (
  pix: Pagarme.Pix.Request,
): Promise<Pagarme.Pix.Response> => {
  try {
    const response = await HttpClient.post(ApiRoutes.pix, pix);
    return response.data;
  } catch (error) {
    // TODO notify error
    return error as any;
  }
};
