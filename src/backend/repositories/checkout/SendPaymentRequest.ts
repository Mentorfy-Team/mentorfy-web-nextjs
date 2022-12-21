import { HttpServer } from '~/backend/helpers/HttpClient';
import { GetPlan } from './GetPlan';

export const SendPaymentRequest = async (data: Checkout.PaymentRequest) => {
  const plan = await GetPlan(data.plan_id);
  const category = plan.days === 30 ? 'monthly' : 'yearly';

  try {
    const infoFormated = {
      plan_id: data.plan_id,
      card_number: data.card.card_number,
      card_cvv: data.card.card_cvv,
      card_holder_name: data.card.card_holder_name,
      card_expiration_date: data.card.card_expiration_date,
      payment_method: data.payment_method,
      items: [
        {
          id: data.plan_id + '',
          title: 'subscription',
          unit_price: plan.amount,
          quantity: plan.days,
          tangible: false,
          category: category,
        },
      ],
      customer: {
        external_id: data.plan_id,
        email: data.customer.email,
        name: data.customer.name,
        document_number: data.customer.document_number,
        address: {
          street: data.customer.address.street,
          street_number: data.customer.address.street_number,
          neighborhood: data.customer.address.neighborhood,
          zipcode: data.customer.address.zipcode,
        },
        phone: {
          ddd: data.customer.phone.ddd,
          number: data.customer.phone.number,
        },
      },
    };
    const response = await HttpServer.post<Checkout.Subscription>(
      '/subscriptions',
      infoFormated,
    );

    return response;
  } catch (error) {
    return null;
  }
};
