import { FC, useState } from 'react';
import InputField from '@app/components/atoms/InputField';
import { PasswordRecover } from '@app/services/auth/recover.service';
import { userStore } from '@app/stores';
import {
  Accent,
  AnimatedView,
  InfoText,
  LinkButton,
  LoginButton,
  SubTitle,
} from '../styles';

const EsqueciMinhaSenha: FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setAppParams, appParams } = userStore();

  const HandleLogin = async () => {
    setIsLoading(true);
    await PasswordRecover(email);
    setIsLoading(false);
    setAppParams({ subpage: 'login' });
  };

  return (
    <AnimatedView>
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
          <LinkButton onClick={() => setAppParams({ subpage: 'login' })}>
            Clique Aqui
          </LinkButton>
        </Accent>
      </InfoText>
    </AnimatedView>
  );
};

export default EsqueciMinhaSenha;
