import { CreateOrder } from '@app/backend/repositories/pagarme/order/CreateOrder';

type GetRequest = Checkout.Pix.Post.Request;
type GetResponse = Checkout.Post.Response;

export const post = async (req: GetRequest, res: GetResponse) => {
  const data = req.body;

  // * Não é necessário verificar se já possui assinatura em ativa.
  // * Consideramos uma compra incremental

  const conclusion = await CreateOrder(data);

  if (!conclusion) {
    return res.status(503).json({
      info: 'Não foi possível concluir o pagamento. Tentar novamente mais tarde.',
    });
  }

  return res.status(200).json(conclusion);
};
