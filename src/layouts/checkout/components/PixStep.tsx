import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import React from 'react';
import QRCode from 'react-qr-code';
import NextImage from 'next/image';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
// import { Container } from './styles';

const PixStep = ({ qrcode }: { qrcode: string }) => {
  return (
    <Box
      sx={() => ({
        color: '#000',
      })}
      display="flex"
      flexDirection="column"
      alignSelf="center"
    >
      <NextImage
        style={{
          alignSelf: 'center',
          marginBottom: '32px',
          marginTop: '16px',
        }}
        src="/images/pix.png"
        width={140}
        height={50}
        alt="Pix"
      />

      <Typography variant="h5" fontWeight="bold" color="green" m={3}>
        Pedido gerado! Agora finalize o pagamento
      </Typography>
      <Typography
        sx={{
          textAlign: 'left',
        }}
        m={2}
      >
        <div>1- Abra o app do seu banco e entre na opção Pix.</div>
        <div>2- Escolha a opção Pagar / Pix copia e cola.</div>
        <div>3- Escaneie o QR code. Se preferir, copie e cole o código.</div>
        <div>4- Depois, confirme o pagamento.</div>
        <div>
          5- Pronto! Você receberá um email de confirmação com seu acesso.
        </div>
      </Typography>
      <Typography fontWeight="bold" mb={6}>
        A aprovação leva no máximo 2 minutos
      </Typography>

      <QRCode
        size={128}
        style={{
          height: 'auto',
          maxWidth: '100%',
          width: '100%',
          maxHeight: '256',
          marginBottom: '16px',
        }}
        value={qrcode}
        viewBox={'0 0 128 128'}
      />

      <Box
        sx={(theme) => ({
          color: 'text.primary',
          backgroundColor: theme.palette.primary.main,
          borderRadius: 2,
          padding: '8px 32px',
          marginTop: 2,
          marginBottom: 2,
          overflowWrap: 'anywhere',
        })}
      >
        <p>
          <strong>Pix Copia e Cola:</strong>
          <div>{qrcode}</div>
        </p>
      </Box>

      <LoadingButton
        variant="contained"
        type="button"
        sx={{ width: '100%' }}
        onClick={() => {
          navigator.clipboard.writeText(qrcode);
        }}
      >
        COPIAR CÓDIGO PIX
      </LoadingButton>
      <div
        style={{
          fontSize: '0.8rem',
          textAlign: 'center',
          marginTop: '16px',
        }}
      >
        * Caso você já tenha um cadastro, basta{' '}
        <Link href="/">acessar sua conta.</Link>.
      </div>
    </Box>
  );
};

export default PixStep;
