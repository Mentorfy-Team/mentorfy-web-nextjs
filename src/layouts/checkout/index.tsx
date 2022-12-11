import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { GetAuthSession } from '~/helpers/AuthSession';
import CreditCard from '~/../public/svgs/credit-card';
import Pix from '~/../public/svgs/pix';
import { AboutPix, Author, BannerWrapper, BpCheckedIcon, BpIcon, CardWrapper, CustomSelectField, Form, FormHeader, InfoWrapper, Input, MethodText, PaymentInfoWrapper, PaymentMethWrapper, PixInfoWrapper, PixText, PoliciesWrapper, Price, SaveDataText, SecurityText, Title } from './styles';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Checkout = () => {
  const theme = useTheme();
  const [tab, setTab] = useState<number>(0);
  const [day, setSelectedDay] = useState('');
  const [month, setSelectedMonth] = useState('');
  const days = [{ id: 0, label: '1' }, { id: 1, label: '2' }, { id: 2, label: '3' }, { id: 3, label: '4' }];
  const months = [{ id: 0, label: 'Janeiro' }, { id: 1, label: 'Fevereiro' }, { id: 2, label: 'Março' }, { id: 3, label: 'Abril' }];
  return (
    <ContentWidthLimit withoutScroll maxWidth={600} >
      <BannerWrapper>
        <Image
          alt='mentorfy-banner'
          src='/images/frase.png'
          width={580}
          height={250}
        />
      </BannerWrapper>
      <Form>
        <FormHeader>
          <Image
            alt='mentorfy-banner'
            src='/images/background.webp'
            width={150}
            height={80}
          />
          <InfoWrapper>
            <Title>MentorFy</Title>
            <Author>Autor: MentorFy Team</Author>
            <Price>R$897,00</Price>
          </InfoWrapper>
        </FormHeader>
        <Input
          type='text'
          placeholder='Nome Completo'
        />
        <Input
          type='email'
          placeholder='E-mail'
        />
        <Input
          type='email'
          placeholder=' Confirme seu e-mail'
        />
        <Input
          type='text'
          placeholder='CPF/CNPJ'
        />
        <PaymentMethWrapper>
          <CardWrapper onClick={() => setTab(0)} sx={{ borderColor: `${tab == 0 ? theme.palette.accent.main : '#bebebe'}` }}>
            <CreditCard fill={tab == 0 ? theme.palette.accent.main : theme.palette.caption.main} />
            <MethodText sx={{ color: `${tab == 0 ? theme.palette.accent.main : theme.palette.caption.main}` }}>Cartão de Crédito</MethodText>
          </CardWrapper>
          <CardWrapper onClick={() => setTab(1)} sx={{ borderColor: `${tab == 1 ? theme.palette.accent.main : '#bebebe'}` }}>
            <Pix fill={tab == 1 ? theme.palette.accent.main : theme.palette.caption.main} />
            <MethodText sx={{ color: `${tab == 1 ? theme.palette.accent.main : theme.palette.caption.main}` }}>PIX</MethodText>
          </CardWrapper>
        </PaymentMethWrapper>

        {tab == 0 &&
          <>
            <PaymentInfoWrapper>
              <Input
                type='text'
                placeholder='Número do cartão de crédito' />
              <Input
                type='text'
                placeholder='Nome impresso no cartão' />
              <Box sx={{ display: 'flex', gap: '0.5rem', width: '100%', alignItems: 'center' }}>
                <CustomSelectField>
                  <Select
                    value={day}
                    name="teams"
                    onChange={(e) => {
                      setSelectedDay(e.target.value);
                    }}
                    sx={{ color: `${theme.palette.caption.dark}` }}
                  >
                    {days?.map((day) => (
                      <MenuItem key={day.id} value={day.id}>
                        {day.label}
                      </MenuItem>
                    ))}
                  </Select>
                </CustomSelectField>

                <CustomSelectField>
                  <Select
                    value={month}
                    name="teams"
                    onChange={(e) => {
                      setSelectedMonth(e.target.value);
                    }}
                    sx={{ color: `${theme.palette.caption.dark}` }}
                  >
                    {months?.map((month) => (
                      <MenuItem key={month.id} value={month.id}>
                        {month.label}
                      </MenuItem>
                    ))}
                  </Select>
                </CustomSelectField>
                <Input
                  type='text'
                  placeholder='CVV'
                />
              </Box>
              <CustomSelectField>
                <InputLabel>Parcelas</InputLabel>
                <Select
                  value={month}
                  name="teams"
                  label='Parcelas'
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                  }}
                  sx={{ color: `${theme.palette.caption.dark}` }}
                >
                  {months?.map((month) => (
                    <MenuItem key={month.id} value={month.id}>
                      {month.label}
                    </MenuItem>
                  ))}
                </Select>
              </CustomSelectField>
            </PaymentInfoWrapper>
            <PoliciesWrapper>
              {tab == 0 &&
                <>
                  <Box>
                    <Checkbox
                      sx={{
                        padding: '0',
                        color: 'red',
                        marginRight: '0.6rem'
                      }}
                      disableRipple
                      icon={<BpIcon />}
                      checkedIcon={<BpCheckedIcon />} />
                    <SaveDataText variant="caption">
                      Salvar dados para próxima compra
                    </SaveDataText>
                  </Box>
                  <Box sx={{ display: 'flex', gap: '0.9rem', }}>
                    <Image alt='lock' src='/svgs/lock.svg' width={13} height={16} />
                    <SecurityText>
                      Nós protegemos seus dados de pagamento usando encriptação para prover segurança ao nível de bancos
                    </SecurityText>
                  </Box>
                  <Box sx={{ display: 'flex', gap: '0.9rem', }}>
                    <Image alt='lock' src='/svgs/list.svg' width={13} height={16} />
                    <SecurityText>
                      A cobrança aparecerá na sua fatura como: <strong> PG*MENTORFY*SEJAMENTOR</strong>
                    </SecurityText>
                  </Box>
                </>
              }
            </PoliciesWrapper>
          </>
        }
        {tab == 1 &&
          <>
            <PaymentInfoWrapper>

              <PixInfoWrapper>
                <Typography sx={{ fontWeight: 'bold', color: 'black', marginRight: 'auto' }}>Informações sobre o pagamento via PIX:</Typography>
                <AboutPix>
                  <PixText>Valor à vista: <strong>R$897,00.</strong></PixText>
                  <PixText>Liberaçã imdeidata!</PixText>
                  <PixText>É simples, só usar o aplicativo do seu banco para pagar PIX.</PixText>
                  <PixText>Totalmente seguro. O pagamento PIX foi desenvolvido pelo Banco Central para facilitar pagamentos</PixText>
                </AboutPix>
              </PixInfoWrapper>
            </PaymentInfoWrapper>
            <Box sx={{ display: 'flex', gap: '0.9rem', padding: ' 0.5rem  1.2rem' }}>
              <Image alt='lock' src='/svgs/lock.svg' width={13} height={16} />
              <SecurityText>
                Nós protegemos seus dados de pagamento usando encriptação para prover segurança ao nível de bancos
              </SecurityText>
            </Box>
          </>
        }
        <Button variant='contained' type='submit' sx={{ width: '100%' }}>Comprar agora</Button>
        <Image alt='mentorfy' src='/svgs/mentorfy.svg' width={84} height={21} style={{ margin: '0.5rem auto' }} />
      </Form >
    </ContentWidthLimit >
  );
};

export default Checkout;

export const getProps = async (ctx) => {
  const { session } = await GetAuthSession(ctx);

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  return {
    props: {}
  };
};
