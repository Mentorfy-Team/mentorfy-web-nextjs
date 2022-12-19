import { HttpServer } from '~/backend/helpers/HttpClient';

export const SendPaymentRequest = async (data: Checkout.PaymentRequest) => {

  // salvar cartão
  //pClient.cards.create

  // Create - > Transaction - > Result
  try {
    const infoFormated = {
      plan_id: data.plan_id,
      card_number: data.card.card_number,
      card_cvv: data.card.card_cvv,
      card_holder_name: data.card.card_holder_name,
      card_expiration_date: data.card.card_expiration_date,
      payment_method: data.payment_method,
      customer: {
        email: data.customer.email,
        name: data.customer.name,
        document_number: data.customer.document_number,
        address: {
          street: data.customer.address.street,
          street_number: data.customer.address.street_number,
          neighborhood: data.customer.address.neighborhood,
          zipcode: data.customer.address.zipcode
        },
        phone: {
          ddd: data.customer.phone.ddd,
          number: data.customer.phone.number
        }
      }
    };
    const response = await HttpServer.post('/subscriptions', infoFormated);

    return true;
  } catch (error) {
    return null;
  }

};
