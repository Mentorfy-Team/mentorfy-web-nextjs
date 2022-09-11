import { FC, useState } from 'react';
import Divider from '@mui/material/Divider';
import { AcessoSubPage } from '..';
import {
  Accent,
  CreateAccountButton,
  ForgotPassButton,
  InfoText,
  InputField,
  LinkButton,
  LoginButton,
  SubTitle,
  Title,
} from '../styles';

type props = {
  pageChange: (page: AcessoSubPage) => void;
};

const ConfirmarConta: FC<props> = ({ pageChange }) => {
  const [email, setEmail] = useState('');
  const HandleLogin = (name: string, email: string): void => {};

  return (
    <>
      <InfoText>
        * Caso seu endereço de email esteja correto, enviaremos um email de{' '}
        recuperação de senha para o endereço informado com o titulo{' '}
        <b>
          <Accent>Recuperação de Senha.</Accent>
        </b>
      </InfoText>
      <InfoText>
        * Caso tenha dificuldades, fale com nosso suporte para mais informações
        pelo email:{' '}
        <b>
          <Accent>suporte@mentorfy.io</Accent>
        </b>
      </InfoText>
      <LoginButton onClick={() => pageChange('login')}>
        Voltar ao Login
      </LoginButton>
    </>
  );
};

export default ConfirmarConta;
