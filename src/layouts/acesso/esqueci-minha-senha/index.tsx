import { FC, useState } from 'react';
import InputField from '~/components/atoms/InputField';
import { PasswordRecover } from '~/services/auth/recover.service';
import { AcessoSubPage } from '..';
import {
  Accent,
  InfoText,
  LinkButton,
  LoginButton,
  SubTitle,
} from '../styles';

type props = {
  pageChange: (page: AcessoSubPage) => void;
};

const EsqueciMinhaSenha: FC<props> = ({ pageChange }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const HandleLogin = async () => {
    setIsLoading(true);
    await PasswordRecover(email);
    setIsLoading(false);
    pageChange('confirmar-conta');
  };

  return (
    <>
      <SubTitle pb={3} color={(theme) => theme.palette.accent.main}>
        Para{' '}
        <Accent>
          <b>recuperar sua senha</b>
        </Accent>
        , digite seu email de acesso:
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
      <LoginButton
        loading={isLoading}
        disabled={isLoading}
        onClick={() => HandleLogin()}
      >
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
