import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import CreditCard from '~/../public/svgs/credit-card';
import Pix from '~/../public/svgs/pix';
import {
  AboutPix,
  Author,
  BannerWrapper,
  BpCheckedIcon,
  BpIcon,
  CardWrapper,
  Form,
  FormHeader,
  InfoWrapper,
  MethodText,
  PaymentInfoWrapper,
  PaymentMethWrapper,
  PixInfoWrapper,
  PixText,
  PoliciesWrapper,
  Price,
  SaveDataText,
  SecurityText,
  Title,
} from './styles';
import { useTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { SendPayment } from '~/services/checkout/payment.service';
import { SendPixPayment } from '~/services/checkout/pix.service';
import PixStep from './components/PixStep';
import Success from './components/Success';
import { GetPlan } from '~/backend/repositories/pagarme/plan/GetPlan';
import { ListPlan } from '~/backend/repositories/pagarme/plan/ListPlan';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CreditCardFields from './components/CreditCardFields';
import CustomerFields from './components/CustomerFields';
import {
  ICheckoutCard,
  ICheckoutPix,
  checkoutCardSchema,
  checkoutPixSchema,
} from './validation';

type Props = {
  product: ProductApi.Product;
  plan: Pagarme.Plan.Response;
};

const Checkout = ({ product, plan }: Props) => {
  const { palette } = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState<number>(0);
  const [saveToNextBuy, setSaveToNextBuy] = useState(false);
  const [data, setData] = useState<
    Pagarme.Subscription.Request | Pagarme.Pix.Request
  >();

  const [showPix, setShowPix] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pixQrCode, setPixQrCode] = useState('');

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

  const onSubmitHandler: SubmitHandler<ICheckoutCard | ICheckoutPix> = async (
    values: ICheckoutCard | ICheckoutPix,
  ) => {
    setIsLoading(true);
    if (tab === 0) {
      const paymentData = Object.assign(values, {
        save_card: saveToNextBuy,
        plan_id: plan.id,
        payment_method: 'credit_card',
      });
      const payment = await SendPayment(
        paymentData as Pagarme.Subscription.Request,
      );
      if (payment.customer) {
        setShowSuccess(true);
      } else {
        //setError();
      }
    } else {
      const expiration_date = new Date();
      expiration_date.setDate(expiration_date.getDate() + 1);
      setIsLoading(true);

      const response = await SendPixPayment({
        items: [
          {
            description: plan.name,
            amount: plan.items[0].pricing_scheme.price_brackets[0].price,
            quantity: 1,
            code: plan.items[0].id + '',
          },
        ],
        customer: values.customer,
        payments: [
          {
            payment_method: 'pix',
            pix: {
              expires_in: parseInt((86400 / 24).toFixed(0)),
            },
          },
        ],
      } as Pagarme.Pix.Request);
      setIsLoading(false);
      if (response.charges[0].status === 'pending') {
        setShowPix(true);
        setPixQrCode(response.charges[0].last_transaction.qr_code);
      }
    }
    setIsLoading(false);
  };

  const onInvalid: SubmitErrorHandler<ICheckoutCard | ICheckoutPix> = (
    values,
  ) => {
    console.log(values);
  };

  const PixData = useMemo(() => {
    return data as Pagarme.Pix.Request;
  }, [data]);

  useEffect(() => {
    if (tab === 0) {
      setData((state) => ({
        ...state,
        plan_id: plan.id,
        payment_method: 'credit_card',
      }));
    }
  }, [plan.id, tab]);

  const methodsCard = useForm<ICheckoutCard>({
    resolver: zodResolver(checkoutCardSchema),
  });

  const methodsPix = useForm<ICheckoutPix>({
    resolver: zodResolver(checkoutPixSchema),
  });

  return (
    <ContentWidthLimit withoutScroll maxWidth={600}>
      <BannerWrapper
        sx={{
          borderRadius: '0.2rem',
          overflow: 'hidden',
        }}
      >
        <Image
          alt="mentorfy-banner"
          src="/images/frase.png"
          width={580}
          height={250}
        />
      </BannerWrapper>
      <FormProvider {...(tab == 0 ? methodsCard : methodsPix)}>
        <Form
          component="form"
          onSubmit={(tab == 0 ? methodsCard : methodsPix).handleSubmit(
            onSubmitHandler,
            onInvalid,
          )}
        >
          <FormHeader>
            <Image
              alt="mentorfy-banner"
              src="/images/background.webp"
              width={150}
              height={80}
            />
            <InfoWrapper>
              <Title>{plan?.name}</Title>
              <Author>Autor: MentorFy Team</Author>
              <Price>
                {FormatPrice(
                  plan.items[0].pricing_scheme.price_brackets[0].price,
                )}
              </Price>
            </InfoWrapper>
          </FormHeader>
          {showPix && <PixStep qrcode={pixQrCode} />}
          {showSuccess && <Success />}
          {!showPix && !showSuccess && (
            <>
              <CustomerFields />
              <PaymentMethWrapper>
                <CardWrapper
                  onClick={() => setTab(0)}
                  sx={{
                    borderColor: `${
                      tab == 0 ? palette.accent.main : '#bebebe'
                    }`,
                  }}
                >
                  <CreditCard
                    fill={tab == 0 ? palette.accent.main : palette.caption.main}
                  />
                  <MethodText
                    sx={{
                      color: `${
                        tab == 0 ? palette.accent.main : palette.caption.main
                      }`,
                    }}
                  >
                    Cartão de Crédito
                  </MethodText>
                </CardWrapper>
                <CardWrapper
                  onClick={() => setTab(1)}
                  sx={{
                    borderColor: `${
                      tab == 1 ? palette.accent.main : '#bebebe'
                    }`,
                  }}
                >
                  <Pix
                    fill={tab == 1 ? palette.accent.main : palette.caption.main}
                  />
                  <MethodText
                    sx={{
                      color: `${
                        tab == 1 ? palette.accent.main : palette.caption.main
                      }`,
                    }}
                  >
                    PIX
                  </MethodText>
                </CardWrapper>
              </PaymentMethWrapper>

              {tab == 0 && (
                <>
                  <CreditCardFields />
                  <PoliciesWrapper>
                    {tab == 0 && (
                      <>
                        <Box
                          sx={{
                            cursor: 'pointer',
                          }}
                          onClick={() => setSaveToNextBuy(!saveToNextBuy)}
                        >
                          <Checkbox
                            name="save_card"
                            sx={{
                              padding: '0',
                              color: 'red',
                              marginRight: '0.6rem',
                            }}
                            checked={saveToNextBuy}
                            disableRipple
                            icon={<BpIcon />}
                            checkedIcon={<BpCheckedIcon />}
                          />
                          <SaveDataText variant="caption">
                            Salvar dados para próxima compra
                          </SaveDataText>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '0.9rem' }}>
                          <Image
                            alt="lock"
                            src="/svgs/lock.svg"
                            width={13}
                            height={16}
                          />
                          <SecurityText>
                            Nós protegemos seus dados de pagamento usando
                            encriptação para prover segurança ao nível de bancos
                          </SecurityText>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '0.9rem' }}>
                          <Image
                            alt="lock"
                            src="/svgs/list.svg"
                            width={13}
                            height={16}
                          />
                          <SecurityText>
                            A cobrança aparecerá na sua fatura como:{' '}
                            <strong> PG*MENTORFY*</strong>
                          </SecurityText>
                        </Box>
                      </>
                    )}
                  </PoliciesWrapper>
                </>
              )}
              {tab == 1 && (
                <>
                  <PaymentInfoWrapper>
                    <PixInfoWrapper>
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          color: 'black',
                          marginRight: 'auto',
                        }}
                      >
                        Informações sobre o pagamento via PIX:
                      </Typography>
                      <AboutPix>
                        <PixText>
                          Valor à vista: <strong>R$897,00.</strong>
                        </PixText>
                        <PixText>Liberação imediata!</PixText>
                        <PixText>
                          É simples, só usar o aplicativo do seu banco para
                          pagar PIX.
                        </PixText>
                        <PixText>
                          Totalmente seguro. O pagamento PIX foi desenvolvido
                          pelo Banco Central para facilitar pagamentos
                        </PixText>
                      </AboutPix>
                    </PixInfoWrapper>
                  </PaymentInfoWrapper>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '0.9rem',
                      padding: ' 0.5rem  1.2rem',
                    }}
                  >
                    <Image
                      alt="lock"
                      src="/svgs/lock.svg"
                      width={13}
                      height={16}
                    />
                    <SecurityText>
                      Nós protegemos seus dados de pagamento usando encriptação
                      para prover segurança ao nível de bancos
                    </SecurityText>
                  </Box>
                </>
              )}
              <LoadingButton
                loading={isLoading}
                variant="contained"
                type="submit"
                sx={{ width: '100%' }}
              >
                Comprar agora
              </LoadingButton>
            </>
          )}
          <Image
            alt="mentorfy"
            src="/svgs/mentorfy.svg"
            width={84}
            height={21}
            style={{ margin: '0.5rem auto' }}
          />
        </Form>
      </FormProvider>
    </ContentWidthLimit>
  );
};

export default Checkout;

export const getProps = async (ctx) => {
  const id = ctx.query.id;

  const plan = id
    ? await GetPlan(id)
    : (await ListPlan()).find((p) => !p.name.toLowerCase().includes('test'));

  return {
    props: {
      plan: plan,
    },
  };
};
