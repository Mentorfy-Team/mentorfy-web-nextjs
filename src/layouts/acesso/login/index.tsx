import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Auth } from '~/@types/api/auth/auth';
import InputField from '~/components/atoms/InputField';
import Tabbar from '~/components/modules/Tabbar';
import { TabItem } from '~/components/modules/Tabbar/styles';
import { MentorRoutes } from '~/consts/routes/routes.consts';
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

  const onSubmit: SubmitHandler<Auth> = useCallback(
    async (values) => {
      if (!values.email || !values.password) {
        setError('*Preencha todos os campos');
        return;
      }
      setIsLoading(true);
      const registerData = await Authenticate(values);
      console.log('values');
      console.log(values);
      if (!registerData.error) {
        //userLogin(registerData.user);
        route.push(MentorRoutes.home);
      } else {
        if (registerData.error.includes('email')) {
          setError('*Email e ou senha incorretos, tente novamente!');
        }
      }
      setIsLoading(false);
    },
    [route],
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
      <Tabbar
        witborder
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
          register={register('email')}
          error={!!error}
        />
        <InputField
          id="outlined-required"
          label="Senha"
          type={'password'}
          placeholder="Digite sua senha"
          InputLabelProps={{
            shrink: true,
          }}
          register={register('password')}
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
    </>
  );
};

export default Login;
