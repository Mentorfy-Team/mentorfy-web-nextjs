import { HttpPagarme } from '~/backend/helpers/HttpPagarme';

export const ListPlan = async () => {
  try {
    const response = await HttpPagarme.get<Pagarme.Plan[]>('/plans');

    return response.data;
  } catch (error) {
    return null;
  }
};
