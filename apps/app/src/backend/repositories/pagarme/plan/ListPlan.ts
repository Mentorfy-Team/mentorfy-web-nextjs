import { HttpPagarme } from '@app/backend/helpers/HttpPagarme';

export const ListPlan = async () => {
  try {
    const response = await HttpPagarme.get<{
      data: Pagarme.Plan[];
      paging: { total: number };
    }>('/plans');

    return response.data;
  } catch (error) {
    return null;
  }
};
