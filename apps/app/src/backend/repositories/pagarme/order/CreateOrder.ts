import { HttpPagarme } from '@app/backend/helpers/HttpPagarme';

export const CreateOrder = async (data: Pagarme.OrderRequest) => {
  try {
    const response = await HttpPagarme.post<Checkout.Plan>('/orders', data);

    return response.data as Checkout.Plan;
  } catch (error) {
    return null;
  }
};
