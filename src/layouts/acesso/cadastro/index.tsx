import { FC, useCallback, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
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
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    policies: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { userLogin } = userStore();
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

  const formRef = useRef(null);

  const onSubmit = useCallback(async () => {
    const values = inputs;
    setIsLoading(true);

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
      setError(registerData.error);
    }
    setIsLoading(false);
  }, [inputs, pageChange, setInfo, userLogin]);

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
    <div>
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
