import { FC, useCallback, useEffect, useState } from 'react';
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
import { FormWrapper } from '../cadastro/styles';
import {
  Accent,
  AnimatedView,
  ErrorHelper,
  ForgotPassButton,
  LoginButton,
  Title,
} from '../styles';
import SupabaseClient from '~/services/SupabaseClient';

type props = {
  urlProps: any[];
};

const Login: FC<props> = ({ urlProps }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const route = useRouter();
  const { setAppParams, appParams } = userStore();
  const { register, handleSubmit } = useForm<Auth>();

  const {
    data: { profile },
    mutate,
    isLoading: isProfileLoading,
  } = useProfile();

  useEffect(() => {
    const {
      data: { subscription },
    } = SupabaseClient().auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        if (session) {
          SupabaseClient()
            .auth.setSession(session)
            .then(() => {
              mutate();
            });
        }
      }
    });

    return subscription.unsubscribe();
  }, [mutate]);

  useEffect(() => {
    if (!isProfileLoading) {
      if (profile?.id) {
        if (profile?.access_type === 'mentor') {
          route.push(MentorRoutes.home);
        } else {
          route.push(MentoredRoutes.home);
        }
      }
    }
    if (profile?.id) setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProfileLoading, profile]);

  useEffect(() => {
    if (urlProps?.length > 0) {
      if (urlProps[0].type === 'signup') {
        setAppParams({ subpage: 'cadastro' });
      }
    }
  }, [urlProps, setAppParams]);

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
    }
  }, [email, password]);

  return (
    <AnimatedView>
      <Title variant="body2" fontWeight="300">
        Entre com seu email e senha para acessar sua{' '}
        <Accent>
          <b>área de membros</b>
        </Accent>{' '}
        exclusiva.
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
          onClick={() => setAppParams({ subpage: 'cadastro' })}
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
          disabled={isLoading}
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
          disabled={isLoading}
        />
        {error && <ErrorHelper>{error}</ErrorHelper>}
        <LoginButton loading={isLoading} disabled={isLoading} type="submit">
          ENTRAR
        </LoginButton>
      </FormWrapper>
      <ForgotPassButton
        onClick={() => setAppParams({ subpage: 'esqueci-minha-senha' })}
      >
        Esqueci minha senha
      </ForgotPassButton>
    </AnimatedView>
  );
};

export default Login;
