import { FC, useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import InputField from '@app/components/atoms/InputField';
import { RegisterNewUser } from '@app/services/user.service';
import { userStore } from '@app/stores';
import {
  Accent,
  AnimatedView,
  LoginButton as CadastroButton,
  InfoText,
  LinkButton,
  SubTitle,
} from '../styles';
import { Text } from './components/styles';
import TextSuccess from './components/TextSuccess';
import passwordValidator from './helper/password-validator';
import { FormWrapper, Policies, PoliciesWrapper } from './styles';
import { betaEmailAccess } from '@app/consts/beta-access';

type props = {
  setInfo: (info: any) => void;
  urlProps: any;
};

const Cadastro: FC<props> = ({ setInfo, urlProps }) => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    policies: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { userLogin, setAppParams } = userStore();
  const RePasswordCheck = useMemo(() => {
    return (
      inputs.confirmPassword === inputs.password &&
      inputs.confirmPassword.length > 0
    );
  }, [inputs.password, inputs.confirmPassword]);

  const { minChars, hasNumber, hasSpecial, hasUpper, passed } = useMemo(
    () => passwordValidator(inputs.password),
    [inputs],
  );
  const { appParams } = userStore();

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
    if (passed && RePasswordCheck && inputs.policies) return true;
    return false;
  }, [RePasswordCheck, inputs.policies, passed]);

  const onSubmit = useCallback(async () => {
    const values = inputs;

    if (!betaEmailAccess.includes(values.email.toLocaleLowerCase())) {
      setError(
        'Acesso restrito a usuários betas convidados. Solicite seu convite diretamente.',
      );
      return;
    }
    setIsLoading(true);

    const registerData = await RegisterNewUser(values, urlProps.signup);

    if (!registerData.error) {
      userLogin(registerData.user);
      if (!urlProps.signup) {
        setInfo(
          <>
            <Text>Seu cadastro foi concluído com sucesso!</Text>
            <Text>Você já pode acessar clicando em continuar.</Text>
          </>,
        );
      } else {
        setInfo(
          <>
            <Text
              sx={{
                textAlign: 'center',
                marginBottom: '1rem',
                color: 'green',
              }}
            >
              Seu cadastro foi concluído com sucesso!
            </Text>
            <Text
              sx={{
                opacity: 0.2,
                fontWeight: 300,
                textAlign: 'justify',
                lineHeight: '1.2rem',
              }}
            >
              Ainda é necessário que um administrador da área aprove seu acesso,
              porém você já pode acessar sua conta e acompanhar o status da
              aprovação lá.
            </Text>
          </>,
        );
      }
      setAppParams({ subpage: 'sucesso' });
    } else {
      setError(registerData.error);
    }
    setIsLoading(false);
  }, [inputs, urlProps.signup, userLogin, setAppParams, setInfo]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputs((prev) => ({
        ...prev,
        [event.target.name]: event.target.value || event.target.checked,
      }));
    },
    [],
  );

  return (
    <AnimatedView>
      <SubTitle pb={3} color={(theme) => theme.palette.accent.main}>
        Para se{' '}
        <Accent>
          <b>cadastrar</b>
        </Accent>
        , preencha os campos abaixo corretamente.
      </SubTitle>
      <FormWrapper onSubmit={onSubmit}>
        <InputField
          label="Nome completo"
          name="name"
          type={'text'}
          placeholder="Digite seu nome completo"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          required
        />
        <InputField
          required
          label="E-mail"
          type={'email'}
          name="email"
          placeholder="Digite seu email"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          error={!!error}
          helperText={error}
        />
        <InputField
          required
          label="Senha"
          name="password"
          type={'password'}
          placeholder="Digite sua senha"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
        />
        {PasswordChecker()}
        <InputField
          required
          error={!RePasswordCheck && inputs.confirmPassword.length > 0}
          label="Confirme sua senha"
          type={'password'}
          name="confirmPassword"
          placeholder="Confirme sua senha"
          helperText={
            !RePasswordCheck && inputs.confirmPassword.length > 0
              ? 'As senhas não conferem'
              : ''
          }
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
        />
        <PoliciesWrapper>
          <Checkbox
            sx={{ alignSelf: 'flex-start', marginLeft: '0rem' }}
            checked={inputs.policies}
            name="policies"
            onChange={handleChange}
          />
          <Policies variant="caption">
            Eu li e aceito os <Link href="/">Termos de Uso</Link> e os{' '}
            <Link href="/">Termos de Responsabilidades Fiscais.</Link>
          </Policies>
        </PoliciesWrapper>
        <CadastroButton
          loading={isLoading}
          disabled={!CheckComplete || isLoading}
          onClick={onSubmit}
        >
          {!isLoading && 'Cadastrar'}
        </CadastroButton>
      </FormWrapper>
      <InfoText>
        Já possui conta?{' '}
        <Accent>
          <LinkButton onClick={() => setAppParams({ subpage: 'login' })}>
            Clique Aqui
          </LinkButton>
        </Accent>
      </InfoText>
      <Box height="64px" />
    </AnimatedView>
  );
};

export default Cadastro;
