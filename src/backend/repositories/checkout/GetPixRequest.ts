import { HttpServer } from '~/backend/helpers/HttpClient';
import { GetPlan } from './GetPlan';

export const GetPixRequest = async (data: Checkout.PixRequest) => {
  const plan = await GetPlan(data.plan_id);
  const category = plan.days === 30 ? 'monthly' : 'yearly';

  const body = Object.assign(data, {
    items: [
      {
        id: data.plan_id,
        title: 'subscription',
        unit_price: plan.amount,
        quantity: plan.days,
        tangible: false,
        category: category,
      },
    ],
  });

  try {
    const response = await HttpServer.post<Checkout.PixResponse>(
      '/transactions',
      body,
    );

    return response;
  } catch (error) {
    return null;
  }
};
