import { ApiRoutes } from '~/consts/routes/api.routes';
import { HttpClient } from '../HttpClient';

export const SendPayment = async (
  data: Pagarme.Subscription.Request,
): Promise<Pagarme.Subscription.Response & Pagarme.Subscription.DataError> => {
  try {
    const response = await HttpClient.post<Pagarme.Subscription.Response>(
      ApiRoutes.checkout,
      data,
    );
    return response.data;
  } catch (error) {
    // TODO notify error
    return (error as Pagarme.Subscription.errors)?.response?.data as any;
  }
};
