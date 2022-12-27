import { HttpPagarme } from '~/backend/helpers/HttpPagarme';

export const CreateCustomerService = async (
  data: Partial<Pagarme.Customer>,
): Promise<Pagarme.Customer> => {
  try {
    const response = await HttpPagarme.post<Pagarme.Customer>(
      '/customers',
      data,
    );

    return response.data;
  } catch (error) {
    return null;
  }
};
