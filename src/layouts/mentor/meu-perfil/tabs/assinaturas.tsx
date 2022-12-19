import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ActivePlan, ExpiredPlan, ExpiresDate, ExpiresDateText, PlanText, PlanWrapper, SignatureText, SignatureWrapper } from '../style';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import PixModal from '../components/PixModal';

const Signature = ({ profile, user, plan }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <SignatureWrapper>
        <SignatureText>Assinatura :</SignatureText>
        <PlanWrapper>
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <PlanText>{plan?.name}</PlanText>
            {profile.is_subscribed &&
              <ActivePlan>Ativo</ActivePlan>
            }
            {!profile.is_subscribed &&
              <ExpiredPlan>Expirado</ExpiredPlan>
            }
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ExpiresDateText>Vencimento</ExpiresDateText>
            <ExpiresDate>{new Date(profile.expiration_date).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            })}</ExpiresDate>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <ExpiresDateText>Valor Total</ExpiresDateText>
            <ExpiresDate>{FormatPrice(plan.amount)}</ExpiresDate>
          </Box>

          <Button sx={{ textTransfor: 'uppercase' }}>
            Alterar Pagamento
          </Button>

          <Button variant='outlined'
            onClick={() => setOpen(true)}
            sx={{
              background: 'none',
              border: `1px solid ${theme.palette.accent.main}`,
              textTransform: 'none'
            }}>
            Pagar Fatura
          </Button>
        </PlanWrapper>
      </SignatureWrapper>
      <PixModal open={open} setOpen={setOpen} user={user} />
    </>
  );
};

export default Signature;
