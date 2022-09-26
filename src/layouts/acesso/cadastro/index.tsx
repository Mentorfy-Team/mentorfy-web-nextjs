import { FC, useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '~/components/atoms/InputField';
import { RegisterNewUser } from '~/services/user.service';
import { userStore } from '~/stores';
import { AcessoSubPage } from '..';
import {
  Accent,
  LoginButton as CadastroButton,
  InfoText,
  LinkButton,
  SubTitle,
} from '../styles';
import { Text } from './components/styles';
import TextSuccess from './components/TextSuccess';
import passwordValidator from './helper/password-validator';
import { FormWrapper, Policies, PoliciesWrapper } from './styles';

type props = {
  pageChange: (page: AcessoSubPage) => void;
  setInfo: (info: any) => void;
};

const Cadastro: FC<props> = ({ pageChange, setInfo }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [rePassword, setRePassword] = useState('');
  const [acceptPolices, setAcceptPolices] = useState(false);
  const { register, handleSubmit } = useForm<UserClient.SignUp>();
  const { userLogin } = userStore();
  const [index, setIndex] = useState(1);
  const RePasswordCheck = useMemo(() => {
    return rePassword === password && rePassword.length > 0;
  }, [password, rePassword]);

  const { minChars, hasNumber, hasSpecial, hasUpper, passed } = useMemo(
    () => passwordValidator(password),
    [password],
  );

  const PasswordChecker = useCallback(() => {
    return (
      <Box pb={2}>
        <TextSuccess success={minChars}>* Mínimo 8 caracteres</TextSuccess>
        <TextSuccess success={hasNumber}>* Um número</TextSuccess>
        <TextSuccess success={hasUpper}>* Uma letra maiúscula</TextSuccess>
        <TextSuccess success={hasSpecial}>
          * Um símbolo (ex: #, $, %,&)
        </TextSuccess>
      </Box>
    );
  }, [hasNumber, hasSpecial, hasUpper, minChars]);

  const CheckComplete = useMemo(() => {
    if (passed && RePasswordCheck && acceptPolices) return true;
    return false;
  }, [RePasswordCheck, acceptPolices, passed]);

  const onSubmit: SubmitHandler<UserClient.SignUp> = useCallback(
    async (values) => {
      setIsLoading(true);
      if (values.password.length <= 0) values.password = password;
      const registerData = await RegisterNewUser(values);

      if (!registerData.error) {
        userLogin(registerData.user);
        setInfo(
          <>
            <Text>Seu cadastro foi concluido com sucesso!</Text>
            <Text>Você já pode acessar clicando em continuar.</Text>
          </>,
        );
        pageChange('sucesso');
      } else {
        if (registerData.error.includes('email')) {
          setError('Email já cadastrado');
        }
      }
      setIsLoading(false);
    },
    [pageChange, password, setInfo, userLogin],
  );

  return (
    <div>
      <SubTitle pb={3} color={(theme) => theme.palette.accent.main}>
        Para se{' '}
        <Accent>
          <b>cadastrar</b>
        </Accent>
        , preencha os campos abaixo corretamente.
      </SubTitle>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Nome completo"
          type={'text'}
          placeholder="Digite seu nome completo"
          InputLabelProps={{
            shrink: true,
          }}
          required
          register={register('name')}
        />
        <InputField
          required
          label="E-mail"
          type={'email'}
          placeholder="Digite seu email"
          InputLabelProps={{
            shrink: true,
          }}
          register={register('email')}
          onChange={(e) => setError('')}
          error={!!error}
          helperText={error}
        />
        <InputField
          required
          label="Senha"
          type={'password'}
          placeholder="Digite sua senha"
          InputLabelProps={{
            shrink: true,
          }}
          register={register('password')}
          onChange={(e) => setPassword(e.target.value)}
        />
        {PasswordChecker()}
        <InputField
          required
          error={!RePasswordCheck && rePassword.length > 0}
          label="Confirme sua senha"
          type={'password'}
          placeholder="Confirme sua senha"
          helperText={
            !RePasswordCheck && rePassword.length > 0
              ? 'As senhas não conferem'
              : ''
          }
          InputLabelProps={{
            shrink: true,
          }}
          register={register('confirmPassword')}
          onChange={(e) => setRePassword(e.target.value)}
        />
        <PoliciesWrapper>
          <Checkbox
            sx={{ alignSelf: 'flex-start', marginLeft: '0rem' }}
            {...register('policies')}
            checked={acceptPolices}
            onChange={(e) => setAcceptPolices(e.target.checked)}
          />
          <Policies variant="caption">
            Eu li e aceito os <Link href="/">Termos de Uso</Link> e os{' '}
            <Link href="/">Termos de Responsabilidades Fiscais.</Link>
          </Policies>
        </PoliciesWrapper>
        <CadastroButton
          loading={isLoading}
          disabled={!CheckComplete || isLoading}
          type="submit"
        >
          {!isLoading && 'Cadastrar'}
        </CadastroButton>
      </FormWrapper>
      <InfoText>
        Já possui conta?{' '}
        <Accent>
          <LinkButton onClick={() => pageChange('login')}>
            Clique Aqui
          </LinkButton>
        </Accent>
      </InfoText>
      <Box height="64px" />
    </div>
  );
};

export default Cadastro;
