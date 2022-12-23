import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {
  ActivePlan,
  ExpiredPlan,
  ExpiresDate,
  ExpiresDateText,
  PlanText,
  PlanWrapper,
  SignatureText,
  SignatureWrapper,
} from '../style';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import PixModal from '../components/PixModal';
import LoadingButton from '@mui/lab/LoadingButton';
import PaymentChangeModal from '../components/ChangePayment';

const Signature = ({ profile, customer, plan }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPix, setShowPix] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pixQrCode, setPixQrCode] = useState('');

  const FormatPrice = (price) => {
    // convert cents to reais
    const priceInReais = price / 100;
    // to readable format
    const priceInReaisReadable = priceInReais.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });

    return priceInReaisReadable;
  };

  const handlePixRequest = async () => {
    setIsLoading(true);
    const expiration_date = new Date();
    expiration_date.setDate(expiration_date.getDate() + 1);

    // const response = await SendPixPayment({
    //   plan_id: plan.id,
    //   payment_method: 'pix',
    //   pix_expiration_date: dateToReadable(expiration_date),
    //   amount: plan.amount,
    //   customer: {
    //     external_id: 'checkouk_pix',
    //     email: customer?.email,
    //     name: customer?.name,
    //     type: 'individual',
    //     country: 'br',
    //     documents: [
    //       {
    //         type: 'cpf',
    //         number: customer?.documents[0].number,
    //       },
    //     ],
    //     phone_numbers: customer?.phone_numbers,
    //   },
    //   postback_url: process.env.NEXT_PUBLIC_BASE_URL + '/api/webhooks',
    // });
    setIsLoading(false);
    // if (response.acquirer_name) {
    //   setOpen(true);
    //   // setShowPix(true);
    //   setPixQrCode(response.pix_qr_code);
    // }
  };

  return (
    <>
      <SignatureWrapper>
        <SignatureText>Assinatura :</SignatureText>
        <PlanWrapper>
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <PlanText>{plan?.name}</PlanText>
            {profile.is_subscribed && <ActivePlan>Ativo</ActivePlan>}
            {!profile.is_subscribed && <ExpiredPlan>Expirado</ExpiredPlan>}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ExpiresDateText>Vencimento</ExpiresDateText>
            <ExpiresDate>
              {new Date(profile.expiration_date).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })}
            </ExpiresDate>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ExpiresDateText>Valor Total</ExpiresDateText>
            <ExpiresDate>{FormatPrice(plan.amount)}</ExpiresDate>
          </Box>

          <Button
            sx={{ textTransfor: 'uppercase' }}
            onClick={() => setOpenPaymentModal(true)}
          >
            Alterar Pagamento
          </Button>

          {!profile.card_id && (
            <LoadingButton
              loading={isLoading}
              variant="outlined"
              onClick={() => handlePixRequest()}
              sx={{
                background: 'none',
                border: `1px solid ${theme.palette.accent.main}`,
                textTransform: 'none',
              }}
            >
              Pagar Fatura
            </LoadingButton>
          )}
        </PlanWrapper>
      </SignatureWrapper>
      <PixModal open={open} setOpen={setOpen} qrCode={pixQrCode} />
      <PaymentChangeModal
        open={openPaymentModal}
        setOpen={setOpenPaymentModal}
        plan={plan}
      />
    </>
  );
};

export default Signature;
