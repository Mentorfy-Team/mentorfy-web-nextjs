import { FC, useCallback, useMemo, useState } from 'react';
import { Box, Checkbox } from '@mui/material';
import Link from 'next/link';
import { AcessoSubPage } from '..';
import {
  Accent,
  LoginButton as CadastroButton,
  InfoText,
  InputField,
  LinkButton,
  SubTitle,
} from '../styles';
import { Text } from './components/styles';
import TextSuccess from './components/TextSuccess';
import passwordValidator from './helper/password-validator';
import { Policies, PoliciesWrapper } from './styles';

type props = {
  pageChange: (page: AcessoSubPage) => void;
  setInfo: (info: any) => void;
};

const Cadastro: FC<props> = ({ pageChange, setInfo }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [acceptPolices, setAcceptPolices] = useState(false);

  const HandleCadastro = (): void => {
    setInfo(
      <>
        <Text>Seu cadastro foi concluido com sucesso!</Text>
        <Text>Você já pode acessar clicando em continuar.</Text>
      </>,
    );
    pageChange('sucesso');
  };

  const HandlePasswordRequirement = () => {};

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
    if (
      name.length > 0 &&
      passed &&
      RePasswordCheck &&
      email.length > 0 &&
      acceptPolices
    )
      return true;
    return false;
  }, [RePasswordCheck, acceptPolices, email, name, passed]);

  const CadastrarButton = useCallback(() => {
    return (
      <CadastroButton
        disabled={!CheckComplete}
        onClick={() => HandleCadastro()}
        sx={{
          backgroundColor: ({ palette }) =>
            CheckComplete ? palette.accent.main : palette.accent.light,
        }}
      >
        Cadastrar
      </CadastroButton>
    );
  }, [CheckComplete]);

  return (
    <>
      <SubTitle pb={3} color={(theme) => theme.palette.accent.main}>
        Para se{' '}
        <Accent>
          <b>cadastrar</b>
        </Accent>
        , preencha os campos abaixo corretamente.
      </SubTitle>
      <InputField
        required
        label="Nome completo"
        type={'text'}
        placeholder="Digite seu nome completo"
        onChange={(e) => setName(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <InputField
        required
        label="E-mail"
        type={'email'}
        placeholder="Digite seu email"
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <InputField
        required
        label="Senha"
        type={'password'}
        placeholder="Digite sua senha"
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
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
        onChange={(e) => setRePassword(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <PoliciesWrapper>
        <Checkbox
          sx={{ alignSelf: 'flex-start', marginLeft: '-0.8rem' }}
          checked={acceptPolices}
          onChange={(e) => setAcceptPolices(e.target.checked)}
        />
        <Policies variant="caption">
          Eu li e aceito os <Link href="/">Termos de Uso</Link> e os{' '}
          <Link href="/">Termos de Responsabilidades Fiscal.</Link>
        </Policies>
      </PoliciesWrapper>
      {CadastrarButton()}
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

export default Cadastro;
