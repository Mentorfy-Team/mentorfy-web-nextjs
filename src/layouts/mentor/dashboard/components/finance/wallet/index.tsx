import Box from '@mui/material/Box';
import Checkbox, {CheckboxProps} from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { AdvanceButton, ButtonsWrapper, SubTitle, TransferButton, WalletAmount, Wrapper } from './styles';

const Wallet = () => {
    const theme = useTheme();
    function BpCheckbox(props: CheckboxProps) {
        return (
          <Checkbox
            sx={{
              padding: '0',
              color: `${theme.palette.caption.main}`,
              '& .MuiSvgIcon-root': { fontSize: 20},
              '&.Mui-checked': {
                color: '#479BDF',
              },
            }}
            disableRipple
            color="default"
            {...props}
          />
        );
      }
    return (
        <Wrapper>
            <Box>
                <Typography>Carteira</Typography>
                <SubTitle>Pessoa Jurídica</SubTitle>
            </Box>

            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Box>
                    <Typography sx={{fontSize: '0.8rem', marginBottom: '1rem'}}>Disponível para Transferência:</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', float: 'right', gap: '0.5rem'}}>
                        <BpCheckbox  />
                        <WalletAmount>R$1.256,89</WalletAmount>
                    </Box>
                </Box>

                <Box>
                    <Typography sx={{fontSize: '0.8rem', marginBottom: '1rem'}}>Disponível para Antecipar:</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', float: 'right', gap: '0.5rem'}}>
                        <BpCheckbox  />
                        <WalletAmount>R$956,45</WalletAmount>
                    </Box>
                </Box>
            </Box>

            <ButtonsWrapper>
                <AdvanceButton variant='text' >Como antecipar?</AdvanceButton>
                <TransferButton variant='outlined' >Transferir agora</TransferButton>
            </ButtonsWrapper>
        </Wrapper>
    );
};

export default Wallet;
