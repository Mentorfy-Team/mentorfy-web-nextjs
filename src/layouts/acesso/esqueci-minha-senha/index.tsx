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

const EsqueciMinhaSenha: FC<props> = ({ pageChange }) => {
  const [email, setEmail] = useState('');
  const HandleLogin = (name: string, email: string): void => {};

  return (
    <>
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
      <LoginButton onClick={() => pageChange('confirmar-conta')}>
        Confirmar e-mail
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

export default EsqueciMinhaSenha;
