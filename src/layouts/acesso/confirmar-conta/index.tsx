import { FC, useState } from 'react';
import { Divider } from '@mui/material';
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
        * Acesse seu e-mail e procure a mensagem enviada por nosso Suporte com o
        título{' '}
        <b>
          <Accent>Alteração de Senha</Accent>
        </b>
      </InfoText>
      <InfoText>
        * Informe o código destacada no e-mail que contem 5 caracteres (pode ser
        letras e números) no campo{' '}
        <b>
          <Accent>Código de Verificação</Accent>
        </b>
      </InfoText>
      <InfoText sx={{ alignSelf: 'flex-start' }}>
        * Clique em{' '}
        <b>
          <Accent>Recuperar</Accent>
        </b>{' '}
        para cadastrar uma nova senha e acessar o seu perfil
      </InfoText>
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
      <LoginButton onClick={() => pageChange('trocar-senha')}>
        Recuperar
      </LoginButton>
      <InfoText>
        Já possui conta?{' '}
        <Accent>
          <LinkButton onClick={() => pageChange('login')}>
            Clique Aqui
          </LinkButton>
        </Accent>
      </InfoText>
    </>
  );
};

export default ConfirmarConta;
