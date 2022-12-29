import CreditCard from '@app/../public/svgs/credit-card';
import Pix from '@app/../public/svgs/pix';
import {
  CardWrapper,
  MethodText,
  PaymentMethWrapper,
} from '@app/layouts/checkout/styles';
import { useTheme } from '@mui/material/styles';

const PaymentMethPicker = ({ tab, setTab }) => {
  const { palette } = useTheme();
  return (
    <PaymentMethWrapper>
      <CardWrapper
        onClick={() => setTab(0)}
        sx={{
          borderColor: `${tab == 0 ? palette.accent.main : '#bebebe'}`,
        }}
      >
        <CreditCard
          fill={tab == 0 ? palette.accent.main : palette.caption.main}
        />
        <MethodText
          sx={{
            color: `${tab == 0 ? palette.accent.main : palette.caption.main}`,
          }}
        >
          Cartão de Crédito
        </MethodText>
      </CardWrapper>
      <CardWrapper
        onClick={() => setTab(1)}
        sx={{
          borderColor: `${tab == 1 ? palette.accent.main : '#bebebe'}`,
        }}
      >
        <Pix fill={tab == 1 ? palette.accent.main : palette.caption.main} />
        <MethodText
          sx={{
            color: `${tab == 1 ? palette.accent.main : palette.caption.main}`,
          }}
        >
          PIX
        </MethodText>
      </CardWrapper>
    </PaymentMethWrapper>
  );
};

export default PaymentMethPicker;
