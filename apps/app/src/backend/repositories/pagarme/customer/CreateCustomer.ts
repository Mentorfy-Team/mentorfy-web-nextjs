import { HttpPagarme } from '@app/backend/helpers/HttpPagarme';

export const CreateCustomer = async (
  data: Pagarme.Customer,
): Promise<Pagarme.Customer> => {
  try {
    const response = await HttpPagarme.post<Pagarme.Customer>(
      '/customers',
      data,
    );

    return response.data as Pagarme.Customer;
  } catch (error) {
    return null;
  }
};
