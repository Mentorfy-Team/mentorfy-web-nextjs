import { HttpPagarme } from '~/backend/helpers/HttpPagarme';

export const CreateSubscription = async (
  data: Pagarme.Subscription.Request,
): Promise<
  Pagarme.Subscription.Response & Partial<Pagarme.Subscription.DataError>
> => {
  const info = data;
  info.card.billing_address = data.customer.address;
  try {
    const response = await HttpPagarme.post<Pagarme.Subscription.Response>(
      '/subscriptions',
      info,
    );

    return response.data;
  } catch (error) {
    const { response } = error as Pagarme.Subscription.errors;
    if (error) {
      return response.data as any;
    } else {
      return null;
    }
  }
};
