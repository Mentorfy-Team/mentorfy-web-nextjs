import { HttpPagarme } from '~/backend/helpers/HttpPagarme';

export const ListCustomer = async (id: number) => {
  try {
    const response = await HttpPagarme.get<Checkout.Plan>(`/plans/${id}`);

    return response.data as Checkout.Plan;
  } catch (error) {
    return null;
  }
};