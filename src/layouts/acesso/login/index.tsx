import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Auth } from '~/@types/api/auth/auth';
import InputField from '~/components/atoms/InputField';
import Tabbar from '~/components/modules/Tabbar';
import { TabItem } from '~/components/modules/Tabbar/styles';
import { MentorRoutes, MentoredRoutes } from '~/consts/routes/routes.consts';
import { useProfile } from '~/hooks/useProfile';
import { Authenticate } from '~/services/auth/auth.service';
import { userStore } from '~/stores';
import { AcessoSubPage } from '..';
import { FormWrapper } from '../cadastro/styles';
import {
  Accent,
  ErrorHelper,
  ForgotPassButton,
  LoginButton,
  Title,
} from '../styles';

type props = {
  pageChange: (page: AcessoSubPage) => void;
};

const Login: FC<props> = ({ pageChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const route = useRouter();
  const { userLogin } = userStore();
  const { register, handleSubmit } = useForm<Auth>();

  const {
    data: { profile },
    mutate,
  } = useProfile();

  const enter = useCallback(async () => {
    if (profile?.id) {
      if (profile?.access_type === 'mentor') {
        await route.push(MentorRoutes.home);
      } else {
        await route.push(MentoredRoutes.home);
      }
      setIsLoading(false);
    }
  }, [profile, route]);

  const onSubmit: SubmitHandler<Auth> = useCallback(async () => {
    if (!email || !password) {
      setError('*Preencha todos os campos');
      return;
    }
    setIsLoading(true);
    const registerData = await Authenticate({ email, password });
    if (!registerData || registerData.error) {
      setError('*Email e ou senha incorretos, tente novamente!');
      setIsLoading(false);
      return;
    } else {
      mutate();
      enter();
    }
  }, [email, enter, mutate, password]);

  return (
    <>
      <Title>
        Bem vindo a
        <Accent>
          <b> área de membros </b>
        </Accent>
        da Mentorfy.
      </Title>
      <Tabbar
        withborder
        selected={index}
        onChange={(_, value) => setIndex(value)}
      >
        <TabItem
          sx={{
            width: '50%',
            marginLeft: '0px !important',
            alignItems: 'center !important',
          }}
          label="Login"
        />
        <TabItem
          sx={{
            alignItems: 'center !important',
            width: '50%',
            marginLeft: '0px !important',
          }}
          label="Crie sua conta"
          onClick={() => pageChange('cadastro')}
        />
      </Tabbar>
      <FormWrapper
        sx={{ marginTop: '1.5rem' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          required
          id="outlined-required"
          label="E-mail"
          placeholder="Digite seu e-mail"
          InputLabelProps={{
            shrink: true,
          }}
          error={!!error}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
        />
        <InputField
          id="outlined-required"
          label="Senha"
          type={'password'}
          placeholder="Digite sua senha"
          InputLabelProps={{
            shrink: true,
          }}
          error={!!error}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
        />
        {error && <ErrorHelper>{error}</ErrorHelper>}
        <LoginButton loading={isLoading} disabled={isLoading} type="submit">
          ENTRAR
        </LoginButton>
      </FormWrapper>
      <ForgotPassButton onClick={() => pageChange('esqueci-minha-senha')}>
        Esqueci minha senha
      </ForgotPassButton>
    </>
  );
};

export default Login;
