import { HttpServer } from '~/backend/helpers/HttpClient';

export const GetCustomerPagarme = async (data: { customer_id }) => {
  try {
    const params = {
      customer_id: data.customer_id,
    };

    const response = await HttpServer.get<UserTypes.PagarmeCustomer>(
      '/customers',
      {
        params,
      },
    );

    return response;
  } catch (error) {
    return null;
  }
};
