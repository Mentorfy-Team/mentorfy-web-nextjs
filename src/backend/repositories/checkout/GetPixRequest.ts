import { HttpServer } from '~/backend/helpers/HttpClient';

export const GetPixRequest = async (data: Checkout.PixRequest) => {
  try {
    const response = await HttpServer.post<Checkout.PixResponse>(
      '/transactions',
      data,
    );

    return response;
  } catch (error) {
    return null;
  }
};
