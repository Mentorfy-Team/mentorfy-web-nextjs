import { HttpPagarme } from '~/backend/helpers/HttpPagarme';

export const EditSubscription = async (
  subscription_id,
  card,
): Promise<Checkout.Subscription> => {
  try {
    const response = await HttpPagarme.patch<Checkout.Subscription>(
      `/subscriptions/${subscription_id}/card`,
      {
        card,
      },
    );

    return response.data;
  } catch (error) {
    return null;
  }
};
