import { HttpPagarme } from '@app/backend/helpers/HttpPagarme';

export const DeleteSubscription = async (
  subscription_id: number,
): Promise<Pagarme.Subscription.Response> => {
  try {
    const response = await HttpPagarme.delete<Pagarme.Subscription.Response>(
      `subscriptions/${subscription_id}`,
    );

    return response.data;
  } catch (error) {
    return null;
  }
};
