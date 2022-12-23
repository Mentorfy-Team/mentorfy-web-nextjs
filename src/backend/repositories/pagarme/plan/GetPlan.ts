import { HttpPagarme } from '~/backend/helpers/HttpPagarme';

export const GetPlan = async (id: number) => {
  try {
    const response = await HttpPagarme.get<Pagarme.Plan.Response>(
      `/plans/${id}`,
    );

    return response.data;
  } catch (error) {
    return null;
  }
};
