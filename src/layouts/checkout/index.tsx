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
  Input,
  InputsWrapper,
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
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { GetPlans } from '~/services/checkout/plans.service';
import { SendPayment } from '~/services/checkout/payment.service';
import { SendPixPayment } from '~/services/checkout/pix.service';
import PixStep from './components/PixStep';
import { dateToReadable } from '~/backend/http/clients/list.api';
import Success from './components/Success';
import { GetPlan } from '~/backend/repositories/checkout/GetPlan';

type Props = {
  product: ProductApi.Product;
  plan: Checkout.Plan;
};

const Checkout = ({ product, plan }: Props) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState<number>(0);
  const [saveToNextBuy, setSaveToNextBuy] = useState(false);
  const [data, setData] = useState<Checkout.PaymentRequest>();
  const [confirmedEmail, setConfirmedEmail] = useState<string>('');

  const [showPix, setShowPix] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pixQrCode, setPixQrCode] = useState('');

  const { handleSubmit } = useForm();

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

  const handleData = (e, categoryName, fieldName, subCategory) => {
    const stateCategory = data[categoryName];
    const stateField = stateCategory ? stateCategory[fieldName] : null;

    if (subCategory === null) {
      setData((state) => {
        const data = {
          ...state,
          [categoryName]: {
            ...stateCategory,
            [fieldName]: e.target.value,
          },
        };
        return data;
      });
    } else {
      setData((state) => {
        const data = {
          ...state,
          [categoryName]: {
            ...stateCategory,
            [fieldName]: {
              ...stateField,
              [subCategory]: e.target.value,
            },
          },
        };
        return data;
      });
    }
  };

  const formatExpiredDate = (date: string) => {
    if (!date) return;
    console.log(date);
    if (date.length >= 5) {
      return date;
    }

    if (date.replace('/', '')?.length >= 4) {
      const month = date.slice(0, 2);
      const year = date.slice(2, 4);

      return month + '/' + year;
    }

    return date.replace('/', '');
  };

  useEffect(() => {
    if (tab === 0) {
      setData((state) => ({
        ...state,
        plan_id: plan.id,
        payment_method: 'credit_card',
      }));
    }
  }, [plan.id, tab]);
  const onSubmit = async () => {
    setIsLoading(true);
    if (tab === 0) {
      const paymentData = Object.assign(data, { save_card: saveToNextBuy });
      const payment = await SendPayment(paymentData);
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
        plan_id: plan.id,
        payment_method: 'pix',
        pix_expiration_date: dateToReadable(expiration_date),
        amount: plan.amount,
        customer: {
          external_id: 'checkouk_pix',
          email: data.customer?.email,
          name: data.customer?.name,
          type: 'individual',
          country: 'br',
          documents: [
            {
              type: 'cpf',
              number: data.customer?.document_number,
            },
          ],
          phone_numbers: [
            '+55' + data.customer?.phone?.ddd + data.customer?.phone?.number,
          ],
        },
        postback_url: process.env.NEXT_PUBLIC_BASE_URL + '/api/webhooks',
      });
      setIsLoading(false);
      if (response.acquirer_name) {
        setShowPix(true);
        setPixQrCode(response.pix_qr_code);
      }
    }
    setIsLoading(false);
  };

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

      <Form onSubmit={handleSubmit(onSubmit)}>
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
            <Price>{FormatPrice(plan.amount)}</Price>
          </InfoWrapper>
        </FormHeader>
        {showPix && <PixStep qrcode={pixQrCode} />}
        {showSuccess && <Success />}
        {!showPix && !showSuccess && (
          <>
            <Input
              type="text"
              required
              placeholder="Nome Completo"
              onChange={(e) => handleData(e, 'customer', 'name', null)}
            />
            <Input
              type="email"
              required
              placeholder="E-mail"
              onChange={(e) => handleData(e, 'customer', 'email', null)}
            />
            <Input
              type="email"
              placeholder=" Confirme seu e-mail"
              onChange={(e) => setConfirmedEmail(e.target.value)}
              error={
                confirmedEmail.length > 0 &&
                confirmedEmail !== data.customer.email
                  ? true
                  : false
              }
            />
            <Input
              type="text"
              required
              placeholder="CPF/CNPJ"
              onChange={(e) =>
                handleData(e, 'customer', 'document_number', null)
              }
            />
            <Input
              type="text"
              required
              placeholder="Bairro"
              onChange={(e) =>
                handleData(e, 'customer', 'address', 'neighborhood')
              }
            />
            <Input
              type="text"
              required
              placeholder="Rua"
              onChange={(e) => handleData(e, 'customer', 'address', 'street')}
            />
            <InputsWrapper>
              <Input
                type="text"
                required
                placeholder="Número"
                onChange={(e) =>
                  handleData(e, 'customer', 'address', 'street_number')
                }
              />
              <Input
                type="text"
                required
                placeholder="CEP"
                onChange={(e) =>
                  handleData(e, 'customer', 'address', 'zipcode')
                }
              />
            </InputsWrapper>
            <InputsWrapper>
              <Input
                type="text"
                required
                placeholder="DDD"
                onChange={(e) => handleData(e, 'customer', 'phone', 'ddd')}
                sx={{ width: '20%' }}
              />
              <Input
                type="text"
                required
                placeholder="Número de telefone"
                onChange={(e) => handleData(e, 'customer', 'phone', 'number')}
              />
            </InputsWrapper>
            <PaymentMethWrapper>
              <CardWrapper
                onClick={() => setTab(0)}
                sx={{
                  borderColor: `${
                    tab == 0 ? theme.palette.accent.main : '#bebebe'
                  }`,
                }}
              >
                <CreditCard
                  fill={
                    tab == 0
                      ? theme.palette.accent.main
                      : theme.palette.caption.main
                  }
                />
                <MethodText
                  sx={{
                    color: `${
                      tab == 0
                        ? theme.palette.accent.main
                        : theme.palette.caption.main
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
                    tab == 1 ? theme.palette.accent.main : '#bebebe'
                  }`,
                }}
              >
                <Pix
                  fill={
                    tab == 1
                      ? theme.palette.accent.main
                      : theme.palette.caption.main
                  }
                />
                <MethodText
                  sx={{
                    color: `${
                      tab == 1
                        ? theme.palette.accent.main
                        : theme.palette.caption.main
                    }`,
                  }}
                >
                  PIX
                </MethodText>
              </CardWrapper>
            </PaymentMethWrapper>

            {tab == 0 && (
              <>
                <PaymentInfoWrapper>
                  <Input
                    type="text"
                    placeholder="Número do cartão de crédito"
                    required
                    onChange={(e) => handleData(e, 'card', 'card_number', null)}
                  />
                  <Input
                    type="text"
                    placeholder="Nome impresso no cartão"
                    required
                    onChange={(e) =>
                      handleData(e, 'card', 'card_holder_name', null)
                    }
                  />
                  <InputsWrapper>
                    <Input
                      type="text"
                      required
                      value={formatExpiredDate(
                        data?.card?.card_expiration_date,
                      )}
                      placeholder="Data de vencimento"
                      onChange={(e) => {
                        e.target.value.length <= 5
                          ? handleData(e, 'card', 'card_expiration_date', null)
                          : null;
                      }}
                    />
                    <Input
                      type="text"
                      placeholder="CVV"
                      required
                      onChange={(e) => {
                        e.target.value.length <= 3
                          ? handleData(e, 'card', 'card_cvv', null)
                          : null;
                      }}
                    />
                  </InputsWrapper>
                </PaymentInfoWrapper>
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
                        É simples, só usar o aplicativo do seu banco para pagar
                        PIX.
                      </PixText>
                      <PixText>
                        Totalmente seguro. O pagamento PIX foi desenvolvido pelo
                        Banco Central para facilitar pagamentos
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
    </ContentWidthLimit>
  );
};

export default Checkout;

export const getProps = async (ctx) => {
  const id = ctx.query.id;

  const plan = await GetPlan(id);

  const plans = await GetPlans();

  return {
    props: {
      plan: plan ?? plans[0],
    },
  };
};
