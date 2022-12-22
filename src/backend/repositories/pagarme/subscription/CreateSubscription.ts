import { HttpPagarme } from '~/backend/helpers/HttpPagarme';

export const CreateSubscription = async (
  data: Pagarme.Subscription.Request,
) => {
  try {
    const response = await HttpPagarme.post<Pagarme.Subscription.Response>(
      '/subscriptions',
      data,
    );

    return response.data;
  } catch (error) {
    return null;
  }
};
