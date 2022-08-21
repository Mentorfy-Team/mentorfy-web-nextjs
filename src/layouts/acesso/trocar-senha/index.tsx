import { FC, useCallback, useMemo, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { AcessoSubPage } from '..';
import { Text } from '../cadastro/components/styles';
import TextSuccess from '../cadastro/components/TextSuccess';
import passwordValidator from '../cadastro/helper/password-validator';
import {
  Accent,
  CreateAccountButton,
  ForgotPassButton,
  InfoText,
  InputField,
  LinkButton,
  LoginButton,
  SubTitle,
  Title,
} from '../styles';

type props = {
  pageChange: (page: AcessoSubPage) => void;
  setInfo: (info: any) => void;
};

const TrocarSenha: FC<props> = ({ pageChange, setInfo }) => {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const HandleLogin = (name: string, email: string): void => {};

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

  return (
    <>
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
      <LoginButton
        onClick={() => {
          setInfo(
            <>
              <Text>Sua senha foi alterada com sucesso!</Text>
              <Text>Você já pode acessar usando sua nova senha.</Text>
            </>,
          );
          pageChange('sucesso');
        }}
      >
        Resetar senha
      </LoginButton>
    </>
  );
};

export default TrocarSenha;
