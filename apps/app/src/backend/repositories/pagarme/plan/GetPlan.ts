import { HttpPagarme } from '@app/backend/helpers/HttpPagarme';

export const GetPlan = async (id: string) => {
  try {
    const response = await HttpPagarme.get<Pagarme.Plan.Response>(
      `/plans/${id}`,
    );

    return response.data;
  } catch (error) {
    return null;
  }
};
