import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ExpiresDate, ExpiresDateText, PlanText, PlanValidity, PlanWrapper, SignatureText, SignatureWrapper } from '../style';
import { useTheme } from '@mui/material/styles';

const Signature = ({ profile, user }) => {
  const theme = useTheme();
  return (
    <SignatureWrapper>
      <SignatureText>Assinatura :</SignatureText>
      <PlanWrapper>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <PlanText>Mentor Pro</PlanText>
          <PlanValidity>À vencer</PlanValidity>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ExpiresDateText>Vencimento</ExpiresDateText>
          <ExpiresDate>10/12/2022</ExpiresDate>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <ExpiresDateText>Valor Total</ExpiresDateText>
          <ExpiresDate>R$19.997,00</ExpiresDate>
        </Box>

        <Button sx={{ textTransfor: 'uppercase' }}>
          Alterar Pagamento
        </Button>

        <Button variant='outlined'
          sx={{
            background: 'none',
            border: `1px solid ${theme.palette.accent.main}`,
            textTransform: 'none'
          }}>
          Pagar Fatura
        </Button>
      </PlanWrapper>
    </SignatureWrapper>
  );
};

export default Signature;
