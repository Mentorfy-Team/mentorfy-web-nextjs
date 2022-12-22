import Typography from '@mui/material/Typography';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, Input, InputsWrapper } from '../../style';
import { useForm } from 'react-hook-form';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  plan: Checkout.Plan;
};

const PaymentChangeModal = ({ open, setOpen, plan }: Props) => {
  const [showPix, setShowPix] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Checkout.PaymentRequest>();
  const { handleSubmit } = useForm();
  const formatExpiredDate = (date: string) => {
    if (!date) return;
    console.log(date);
    if (date.length >= 5) {
      return date;
    }

    if (date.replace('/', '')?.length >= 4) {
      const month = date.slice(0, 2);
      const year = date.slice(2, 4);

      return month + '/' + year;
    }

    return date.replace('/', '');
  };

  useEffect(() => {
    if (showCard) {
      setData((state) => ({
        ...state,
        plan_id: plan.id,
        payment_method: 'credit_card',
      }));
    }
  }, [plan.id, showCard]);

  const handleData = (e, categoryName, fieldName) => {
    const stateCategory = data[categoryName];
    setData((state) => {
      const data = {
        ...state,
        [categoryName]: {
          ...stateCategory,
          [fieldName]: e.target.value,
        },
      };
      return data;
    });
  };
  console.log(data);

  const onSubmit = async () => {
    if (showCard) {
      //const payment = await SendPayment(data);
    } else {
      const expiration_date = new Date();
      expiration_date.setDate(expiration_date.getDate() + 1);

      setIsLoading(true);
      // const response = await SendPixPayment({
      //   plan_id: plan.id,
      //   payment_method: 'pix',
      //   pix_expiration_date: dateToReadable(expiration_date),
      //   amount: plan.amount,
      //   customer: {
      //     external_id: 'checkouk_pix',
      //     email: data.customer?.email,
      //     name: data.customer?.name,
      //     type: 'individual',
      //     country: 'br',
      //     documents: [
      //       {
      //         type: 'cpf',
      //         number: data.customer?.document_number,
      //       },
      //     ],
      //     phone_numbers: [
      //       '+55' + data.customer?.phone?.ddd + data.customer?.phone?.number,
      //     ],
      //   },
      //   postback_url: process.env.NEXT_PUBLIC_BASE_URL + '/api/webhooks',
      // });
      setIsLoading(false);
    }
  };

  return (
    <ModalComponent open={open} setOpen={setOpen} title="Alterar Pagamento">
      <ModalDialogContent sx={{ padding: '0.8rem', gap: '1rem' }}>
        <Typography
          sx={{ fontWeight: '500', fontSize: '1.2rem', marginBottom: '1.2rem' }}
        >
          Escolha o método de pagamento para as suas próximas faturas
        </Typography>

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          <Box
            sx={{ display: 'flex', gap: '1.2rem', cursor: 'pointer' }}
            onClick={() => {
              setShowPix(!showPix);
              setShowCard(false);
            }}
          >
            <Checkbox
              checked={showPix}
              color="success"
              size="small"
              sx={{ padding: '0px', color: 'tertiary.light' }}
            />
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              Pix
            </Typography>
          </Box>
          <Box
            sx={{ display: 'flex', gap: '1.2rem', cursor: 'pointer' }}
            onClick={() => {
              setShowCard(!showCard);
              setShowPix(false);
            }}
          >
            <Checkbox
              checked={showCard}
              color="success"
              size="small"
              sx={{ padding: '0px', color: 'tertiary.light' }}
            />
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              Cartão de Crédito
            </Typography>
          </Box>
        </Box>

        {showPix && (
          <>
            <Typography
              sx={{ textAlign: 'center', fontSize: '1.2rem', margin: '1rem 0' }}
            >
              A partir de agora, você será notificado quando sua assinatura
              vencer. Para efetuar o pagamento, venha a essa tela e clique no
              botão `${'Pagar Fatura'}` e siga as intruções.
            </Typography>

            <LoadingButton
              variant="contained"
              type="button"
              sx={{ width: '40%', alignSelf: 'center' }}
              onClick={() => setOpen(false)}
            >
              SALVAR
            </LoadingButton>
          </>
        )}

        {showCard && (
          <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ background: 'none', width: '100%' }}
          >
            <Input
              type="text"
              placeholder="Número do cartão de crédito"
              required
              color="secondary"
              onChange={(e) => handleData(e, 'card', 'card_number')}
            />
            <Input
              type="text"
              placeholder="Nome impresso no cartão"
              required
              color="secondary"
              onChange={(e) => handleData(e, 'card', 'card_holder_name')}
            />
            <InputsWrapper>
              <Input
                type="text"
                required
                color="secondary"
                value={formatExpiredDate(data?.card?.card_expiration_date)}
                placeholder="Data de vencimento"
                onChange={(e) => {
                  e.target.value.length <= 5
                    ? handleData(e, 'card', 'card_expiration_date')
                    : null;
                }}
              />
              <Input
                type="text"
                placeholder="CVV"
                required
                color="secondary"
                onChange={(e) => {
                  e.target.value.length <= 3
                    ? handleData(e, 'card', 'card_cvv')
                    : null;
                }}
              />
            </InputsWrapper>
            <LoadingButton
              variant="contained"
              type="submit"
              sx={{ width: '40%', alignSelf: 'center' }}
            >
              SALVAR
            </LoadingButton>
          </Form>
        )}
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default PaymentChangeModal;
