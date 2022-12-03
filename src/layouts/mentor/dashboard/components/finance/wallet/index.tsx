import Box from '@mui/material/Box';
import {
  AdvanceButton,
  AvailableAmount,
  ButtonsWrapper,
  SubTitle,
  Title,
  TransferButton,
  WalletAmount,
  Wrapper,
} from './styles';

const Wallet = () => {

  return (
    <Wrapper>
      <Box>
        <Title>Carteira</Title>
        <SubTitle>Pessoa Jurídica</SubTitle>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Box>
          <AvailableAmount>
            Disponível para Transferência:
          </AvailableAmount>

          <WalletAmount>R$1.256,89</WalletAmount>

        </Box>

        <Box>
          <AvailableAmount>
            Disponível para Antecipar:
          </AvailableAmount>

          <WalletAmount>R$956,45</WalletAmount>
        </Box>
      </Box>

      <ButtonsWrapper>
        <TransferButton variant="contained">Transferir agora</TransferButton>
        <AdvanceButton variant="text">Como antecipar?</AdvanceButton>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default Wallet;
