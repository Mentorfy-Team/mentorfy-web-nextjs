import { useState } from 'react';
import { Divider, Typography, useMediaQuery } from '@mui/material';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import {
  AlignSelf,
  BackgroundHolder,
  CreateAccountButton,
  ForgotPassButton,
  Grid,
  InfoText,
  InputField,
  LoginButton,
  SubTitle,
  Title,
  Wrapper,
} from './styles';

function LoginView({}: InferGetStaticPropsType<typeof getProps>) {
  const [email, setEmail] = useState('');
  const mobile = useMediaQuery('(max-width:490px)');
  const HandleLogin = (name: string, email: string): void => {};

  return (
    <Grid container>
      <Grid xs={0} lg={5.5}>
        <BackgroundHolder>
          <Image
            alt="some important man mentoring smart people"
            src="/images/background-login.png"
            layout="fill"
            objectFit="cover"
          />
        </BackgroundHolder>
      </Grid>

      <Grid
        display={'flex'}
        flexDirection="column"
        xs={12}
        lg={6.5}
        sx={{ alignSelf: 'center' }}
      >
        <Wrapper p={5}>
          <AlignSelf pb={4}>
            <Image
              width={300 / (1.75 + (mobile ? 0.5 : 0))}
              height={75 / (1.75 + (mobile ? 0.5 : 0))}
              layout="fixed"
              src="/images/tipografia.png"
              alt="logo"
            />
          </AlignSelf>
          <Title>
            Bem vindo a <b>área de membros</b> da Mentorfy.
          </Title>
          <SubTitle pb={3} color={(theme) => theme.palette.accent.main}>
            Preencha os campos abaixo para acessar a sua conta
          </SubTitle>
          <InputField
            required
            id="outlined-required"
            label="E-mail"
            placeholder="Digite seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <InputField
            required
            id="outlined-required"
            label="Senha"
            type={'password'}
            placeholder="Digite sua senha"
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <LoginButton onClick={() => HandleLogin(email, email)}>
            ENTRAR
          </LoginButton>
          <ForgotPassButton>Esqueci minha senha</ForgotPassButton>
          <Divider />
          <InfoText>Ainda não tem uma conta? Abra agora é simples!</InfoText>
          <CreateAccountButton variant="outlined">
            ABRIR CONTA
          </CreateAccountButton>
        </Wrapper>
      </Grid>
    </Grid>
  );
}

export async function getProps() {
  return {
    props: {},
    revalidate: 1,
  };
}

export default LoginView;
