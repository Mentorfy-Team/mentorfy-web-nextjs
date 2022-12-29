import { HttpPagarme } from '@app/backend/helpers/HttpPagarme';

export const EditPlan = async (id: number) => {
  try {
    const response = await HttpPagarme.get<Checkout.Plan>(`/plans/${id}`);

    return response.data as Checkout.Plan;
  } catch (error) {
    return null;
  }
};
