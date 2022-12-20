import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import QRCode from 'react-qr-code';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  qrCode: string;

}
const PixModal = ({ open, setOpen, qrCode }: Props) => {
  const [showCopied, setShowCopied] = useState(false);

  return (
    <ModalComponent open={open} setOpen={setOpen} title='Pagar Fatura'>
      <ModalDialogContent>
        <Typography sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1rem' }}>
          Pague sua fatura pelo PIX. Leia o QR code ou copie e cole o código pix e atualize sua página assim que realizar o pagamento
        </Typography>

        <Typography sx={{ textAlign: 'center', fontSize: '0.9rem', color: 'gray', marginTop: '0.8rem' }}>
          A aprovação leva no máximo 2 minutos.
        </Typography>

        <QRCode
          size={128}
          style={{
            height: 'auto',
            maxWidth: '100%',
            width: '100%',
            maxHeight: '256',
            margin: '1.5rem 0',
          }}
          value={qrCode}
          viewBox={'0 0 128 128'}
        />

        <Box
          sx={(theme) => ({
            color: 'text.primary',
            backgroundColor: theme.palette.primary.dark,
            borderRadius: 2,
            padding: '8px 32px',
            marginBottom: 2,
            overflowWrap: 'anywhere',
            textAlign: 'center'
          })}
        >
          <p>
            <strong>Chave Pix:</strong>
            <div>{qrCode}</div>
          </p>
        </Box>

        <LoadingButton
          variant="contained"
          type="button"
          sx={(theme) => ({ width: '100%', backgroundColor: `${showCopied ? theme.palette.success.main : ''}` })}
          onClick={() => {
            navigator.clipboard.writeText(qrCode);
            setShowCopied(true);
          }}
        >
          {showCopied ? 'COPIADO COM SUCESSO' : 'COPIAR CÓDIGO PIX'}
        </LoadingButton>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default PixModal;
