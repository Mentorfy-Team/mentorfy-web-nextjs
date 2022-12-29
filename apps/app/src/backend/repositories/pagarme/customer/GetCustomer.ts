import { HttpPagarme } from '@app/backend/helpers/HttpPagarme';

export const GetCustomer = async (id: string) => {
  try {
    const response = await HttpPagarme.get<Pagarme.Customer>(
      `/customers/${id}`,
    );

    return response.data as Pagarme.Customer;
  } catch (error) {
    return null;
  }
};
