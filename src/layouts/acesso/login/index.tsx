import { FC, useCallback, useState } from 'react';
import Divider from '@mui/material/Divider';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Auth } from '~/@types/api/auth/auth';
import { CreateSupabaseWithAuth } from '~/backend/supabase';
import { MentorRoutes } from '~/consts/routes/routes.consts';
import { Authenticate } from '~/services/auth/auth.service';
import { userStore } from '~/stores';
import { AcessoSubPage } from '..';
import { FormWrapper } from '../cadastro/styles';
import {
  Accent,
  CreateAccountButton,
  ErrorHelper,
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const route = useRouter();
  const { setProfile } = userStore();
  const { register, handleSubmit } = useForm<Auth>();

  const onSubmit: SubmitHandler<Auth> = useCallback(
    async (values) => {
      setIsLoading(true);
      const auth = await Authenticate(values);

      if (!auth?.error) {
        const supabase = CreateSupabaseWithAuth(
          null,
          supabaseClient.auth.session()['access_token'],
        );
        const { user } = await supabase.auth.api.getUser(
          supabaseClient.auth.session()['access_token'],
        );
        const { data, error } = await supabase
          .from('profile')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!error) {
          setProfile(data as any);
          route.push(MentorRoutes.home);
        }
      } else {
        if (auth?.error.includes('email')) {
          setError('Email e ou senha incorretos, tente novamente!');
        }
      }
      setIsLoading(false);
    },
    [route, setProfile],
  );

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
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <InputField
          required
          id="outlined-required"
          label="E-mail"
          placeholder="Digite seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          {...register('email')}
          error={!!error}
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
          {...register('password')}
          error={!!error}
        />
        {error && <ErrorHelper>{error}</ErrorHelper>}
        <LoginButton loading={isLoading} disabled={isLoading} type="submit">
          ENTRAR
        </LoginButton>
      </FormWrapper>
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
