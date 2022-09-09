import { FC, useState } from 'react';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/router';
import { routes } from '~/consts/routes/routes.consts';
import { userStore } from '~/stores';
import { AcessoSubPage } from '..';
import {
  Accent,
  CreateAccountButton,
  ForgotPassButton,
  InfoText,
  InputField,
  LoginButton,
  SubTitle,
  Title,
} from '../styles';

type props = {
  pageChange: (page: AcessoSubPage) => void;
};

const Login: FC<props> = ({ pageChange }) => {
  const [email, setEmail] = useState('');
  const route = useRouter();
  const store = userStore();

  const HandleLogin = (name: string, email: string): void => {
    route.push(routes.home.path);
  };

  return (
    <>
      <Title>
        Bem vindo a
        <Accent>
          <b> área de membros </b>
        </Accent>
        da Mentorfy.
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
      <ForgotPassButton onClick={() => pageChange('esqueci-minha-senha')}>
        Esqueci minha senha
      </ForgotPassButton>
      <Divider />
      <InfoText>Ainda não tem uma conta? Abra agora é simples!</InfoText>
      <CreateAccountButton
        onClick={() => pageChange('cadastro')}
        variant="outlined"
      >
        ABRIR CONTA
      </CreateAccountButton>
    </>
  );
};

export default Login;
