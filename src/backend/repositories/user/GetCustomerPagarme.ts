import { HttpServer } from '~/backend/helpers/HttpClient';

export const GetCustomerPagarme = async (data: { customer_id: number }) => {
  try {
    const params = {
      customer_id: data.customer_id,
    };

    const response = await HttpServer.get<UserTypes.PagarmeCustomer>(
      `/customers/${data.customer_id}`,
    );

    return response.data;
  } catch (error) {
    return null;
  }
};
