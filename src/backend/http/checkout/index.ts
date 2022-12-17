import { SendPaymentRequest } from '~/backend/repositories/checkout/SendPaymentRequest';
import { SupabaseServer } from '../../supabase';

type GetRequest = Checkout.Post.Request;
type GetResponse = Checkout.Post.Response;

export const post = async (req: GetRequest, res: GetResponse) => {
  const supabase = SupabaseServer(req, res);
  const data = req.body;

  if (
    !data ||
    !data.name ||
    !data.email ||
    !data.cpf ||
    !data.phone ||
    !data.payment
  ) {
    return res.status(401).json({
      info: 'Dados incorretos ou incompletos.',
    });
  }

  const paymentResult = await SendPaymentRequest(data.payment.card);
  // * 2 - ENVIA PARA A PAGARME A COMPRA

  // * 3 - TENDO SUCESSO, CRIA A CONTA DO USUÁRIO E ENCAMINHA PARA CRIAR UMA SENHA

  // * 4 - TENDO ERRO, RETORNAR A MENSAGEM

  res.status(200).json({
    info: '',
  });
};
