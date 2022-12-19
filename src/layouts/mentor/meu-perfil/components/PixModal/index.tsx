import Typography from '@mui/material/Typography';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  pix: Checkout.PaymentRequest;
}
const PixModal = ({ open, setOpen, pix }: Props) => {

  return (
    <ModalComponent open={open} setOpen={setOpen}>
      <ModalDialogContent>
        <Typography>Pague sua fatura pelo QR code ou copie e cole o código pix.</Typography>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default PixModal;
