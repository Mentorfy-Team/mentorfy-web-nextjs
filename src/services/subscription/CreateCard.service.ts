import { HttpPagarme } from '~/backend/helpers/HttpPagarme';

export const CreateCardService = async (
  customer_id: string,
  data: Partial<Pagarme.Card>,
): Promise<Pagarme.Card> => {
  try {
    const response = await HttpPagarme.post<Pagarme.Card>(
      `/customers/${customer_id}/cards`,
      data,
    );

    return response.data;
  } catch (error) {
    return null;
  }
};
