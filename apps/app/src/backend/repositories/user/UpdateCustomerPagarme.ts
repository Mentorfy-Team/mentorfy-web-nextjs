import { HttpPagarme } from '@app/backend/helpers/HttpPagarme';

export const UpdateCustomerPagarme = async (data: {
  name: string;
  email: string;
  customer_id: string;
}) => {
  try {
    const body = {
      name: data.name,
      email: data.email,
    };

    const params = {
      customer_id: data.customer_id,
    };

    const response = await HttpPagarme.put<
      Pick<Checkout.Customer, 'name' | 'email'>
    >('/customers', body, {
      params,
    });

    return response;
  } catch (error) {
    return null;
  }
};
