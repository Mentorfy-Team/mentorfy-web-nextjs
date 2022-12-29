import { HttpPagarme } from '@app/backend/helpers/HttpPagarme';

export const GetCustomerPagarme = async (data: { customer_id: number }) => {
  try {
    const params = {
      customer_id: data.customer_id,
    };

    const response = await HttpPagarme.get<UserTypes.PagarmeCustomer>(
      `/customers/${data.customer_id}`,
    );

    return response.data;
  } catch (error) {
    return null;
  }
};
