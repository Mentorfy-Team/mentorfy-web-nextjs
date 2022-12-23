import { HttpPagarme } from '~/backend/helpers/HttpPagarme';

export const EditSubscription = async (
  subscription_id,
  card_id,
): Promise<Checkout.Subscription> => {
  try {
    const response = await HttpPagarme.patch<Checkout.Subscription>(
      `/subscriptions/${subscription_id}/card`,
      {
        card_id,
      },
    );

    return response.data;
  } catch (error) {
    return null;
  }
};
