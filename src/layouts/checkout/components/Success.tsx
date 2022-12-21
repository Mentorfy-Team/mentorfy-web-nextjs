import Box from '@mui/material/Box';
import React from 'react';
import Typography from '@mui/material/Typography';
// import { Container } from './styles';

const Success = () => {
  return (
    <Box
      sx={() => ({
        color: '#000',
      })}
      display="flex"
      flexDirection="column"
      alignSelf="center"
    >
      {/* <NextImage
        style={{
          alignSelf: 'center',
          marginBottom: '32px',
          marginTop: '16px',
        }}
        src="/images/pix.png"
        width={140}
        height={50}
        alt="Pix"
      /> */}

      <Typography variant="h5" fontWeight="bold" color="green" m={3} mb={0}>
        Parabéns! Seu pagamento foi aprovado.
      </Typography>
      <Typography
        sx={{
          textAlign: 'left',
        }}
        m={2}
      >
        <div>1- Abra seu email.</div>
        <div>2- Acesse o link e crie uma senha segura.</div>
        <div>3- Pronto! Agora é só começar a sua jornada. 🚀</div>
      </Typography>

      {/* <LoadingButton
        variant="contained"
        type="button"
        sx={{ width: '100%' }}
        onClick={() => {
          navigator.clipboard.writeText(qrcode);
        }}
      >
        COPIAR CÓDIGO PIX
      </LoadingButton> */}
    </Box>
  );
};

export default Success;
