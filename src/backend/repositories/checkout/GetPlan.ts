import { HttpServer } from '~/backend/helpers/HttpClient';

export const GetPlan = async (id: number) => {
  try {
    const response = await HttpServer.get<Checkout.Plan>('/plans', {
      params: {
        plan_id: id,
      },
    });

    return response.data as Checkout.Plan;
  } catch (error) {
    return null;
  }
};
