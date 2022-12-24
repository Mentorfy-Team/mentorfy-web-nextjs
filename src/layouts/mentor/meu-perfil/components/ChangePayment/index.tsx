import Typography from '@mui/material/Typography';
import ModalComponent from '~/components/modules/Modal';
import { useState } from 'react';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form } from '../../style';
import CreditCardFields from '~/components/modules/CreditCardFields';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {
  ICheckoutCard,
  checkoutCardSchema,
} from '~/layouts/checkout/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import PaymentMethPicker from '~/components/modules/PaymentMethPicker/index.';
import { toast } from 'react-toastify';
import CustomerFields from '~/layouts/checkout/components/CustomerFields';
import { UpdateSubscriptionService } from '~/services/subscription/UpdateSubscription.service';
import { ChangeSubscriptionToPixService } from '~/services/subscription/ChangeSubscriptionToPix.service';
import { CreateSubscriptionService } from '~/services/subscription/CreateSubscription.service';
type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  plan: Pagarme.Plan;
  customer?: Pagarme.Customer;
  card_id?: string;
  subscription_id?: string;
};

const PaymentChangeModal = ({
  open,
  setOpen,
  customer,
  card_id,
  subscription_id,
  plan,
}: Props) => {
  const [showOption, setOption] = useState<'Card' | 'Pix'>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler: SubmitHandler<ICheckoutCard> = async (
    values: ICheckoutCard,
  ) => {
    setIsLoading(true);
    if (card_id) {
      // Possui cartão de crédito cadastrado e quer alterar o cartão
      if (showOption === 'Card') {
        await UpdateSubscriptionService(subscription_id, values);

        toast.success('Cartão alterado com sucesso.', {
          autoClose: 10000,
        });
        setOpen(false);
      } else {
        // Possui cartão de crédito cadastrado e quer alterar para Pix
        await ChangeSubscriptionToPixService(subscription_id);

        toast.success('Alterado forma de pagamento para Pix.', {
          autoClose: 10000,
        });
        setOpen(false);
      }
    }
    {
      // Não possui cartão de crédito cadastrado ainda
      if (showOption === 'Card') {
        await CreateSubscriptionService({
          customer_id: customer.address?.city ? customer.id : null,
          customer: customer.address?.city ? null : customer,
          card: values.card,
          plan_id: plan.id,
          payment_method: 'credit_card',
        });

        toast.success('Alterado com sucesso forma de pagamento para cartão.', {
          autoClose: 10000,
        });
        setOpen(false);
      } else {
        // Não possui cartão de crédito cadastrado ainda e quer manter no Pix
        toast.success('Mantido forma de pagamento em Pix.', {
          autoClose: 10000,
        });
        setOpen(false);
      }
    }
    setIsLoading(false);
  };

  const onInvalid: SubmitErrorHandler<ICheckoutCard> = (values) => {
    console.log(values);
  };

  const methodsCard = useForm<ICheckoutCard>({
    resolver: zodResolver(checkoutCardSchema),
  });

  return (
    <ModalComponent open={open} setOpen={setOpen} title="Alterar Pagamento">
      <Typography
        sx={{ fontWeight: '500', fontSize: '1.2rem', marginBottom: '1.2rem' }}
      >
        Escolha o método de pagamento para as suas próximas faturas
      </Typography>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-around',
        }}
        mb={4}
      >
        <PaymentMethPicker
          tab={showOption ? (showOption === 'Card' ? 0 : 1) : null}
          setTab={(value) =>
            value === 0 ? setOption('Card') : setOption('Pix')
          }
        />
      </Box>

      {showOption == 'Pix' && (
        <>
          <Typography
            sx={{ textAlign: 'center', fontSize: '1.0rem', margin: '1rem 0' }}
          >
            Com essa opção, você será notificado quando sua assinatura vencer.
            Para efetuar o pagamento, venha a essa tela e clique em{' '}
            <b
              style={{
                color: '#e27c1c',
              }}
            >
              Pagar Fatura
            </b>{' '}
            e siga as instruções.
          </Typography>

          <LoadingButton
            variant="contained"
            type="button"
            sx={{ width: '40%', alignSelf: 'center' }}
            onClick={() => setOpen(false)}
          >
            SALVAR ALTERAÇÃO
          </LoadingButton>
        </>
      )}

      {showOption == 'Card' && (
        <FormProvider {...methodsCard}>
          <Form
            component="form"
            onSubmit={methodsCard.handleSubmit(onSubmitHandler, onInvalid)}
          >
            {!customer?.document ||
              (!customer.address?.city && <CustomerFields />)}
            <CreditCardFields />
            <LoadingButton
              variant="contained"
              type="submit"
              sx={{ width: '40%', alignSelf: 'center' }}
            >
              SALVAR CARTÃO
            </LoadingButton>
          </Form>
        </FormProvider>
      )}
    </ModalComponent>
  );
};

export default PaymentChangeModal;
