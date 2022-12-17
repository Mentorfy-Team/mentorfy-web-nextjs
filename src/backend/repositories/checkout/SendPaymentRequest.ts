import pagarme from 'pagarme';

export const SendPaymentRequest = async (card: Checkout.Card) => {
  const pClient = await pagarme.client.connect({
    api_key: process.env.PAGARME_API_KEY,
  });

  // salvar cartão
  //pClient.cards.create

  // Create - > Transaction - > Result
  pClient.subscriptions.create({}, {});
};
