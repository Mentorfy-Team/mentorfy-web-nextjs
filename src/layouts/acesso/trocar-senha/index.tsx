import { FC, useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import InputField from '~/components/atoms/InputField';
import { PasswordChange } from '~/services/auth/password-change.service';
import { Text } from '../cadastro/components/styles';
import TextSuccess from '../cadastro/components/TextSuccess';
import passwordValidator from '../cadastro/helper/password-validator';
import { Accent, AnimatedView, LoginButton, SubTitle } from '../styles';
import { userStore } from '~/stores';

type props = {
  setInfo: (info: any) => void;
  access_token: string;
  type: 'invite' | 'recovery';
};

const TrocarSenha: FC<props> = ({ setInfo, access_token, type }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rePassword, setRePassword] = useState('');
  const { setAppParams } = userStore();
  const route = useRouter();

  const title = useMemo(() => {
    if (type === 'invite') {
      return (
        <>
          Para finalizar seu{' '}
          <Accent>
            <b>cadastro</b>
          </Accent>
          , precisamos que você crie uma senha segura.
        </>
      );
    }
    return (
      <>
        Para concluir a{' '}
        <Accent>
          <b>Recuperação de Senha</b>
        </Accent>
        , agora precisamos que você crie uma nova senha.
      </>
    );
  }, [type]);

  const buttonTitle = useMemo(() => {
    if (type === 'invite') {
      return 'Cadastrar';
    }
    return 'Resetar senha';
  }, [type]);

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

  const handlePasswordChange = useCallback(async () => {
    setIsLoading(true);
    await PasswordChange(password, access_token);
    setIsLoading(false);
    route.replace('/');
    setInfo(
      <>
        <Text>Sua senha foi alterada com sucesso!</Text>
        <Text>Você já pode acessar usando sua nova senha.</Text>
      </>,
    );
    setAppParams({ subpage: 'sucesso' });
  }, [access_token, password, route, setInfo]);

  const CadastrarButton = useCallback(() => {
    return (
      <LoginButton
        loading={isLoading}
        disabled={
          !passed || rePassword.length == 0 || !RePasswordCheck || isLoading
        }
        onClick={() => handlePasswordChange()}
      >
        {buttonTitle}
      </LoginButton>
    );
  }, [
    RePasswordCheck,
    buttonTitle,
    handlePasswordChange,
    isLoading,
    passed,
    rePassword.length,
  ]);

  return (
    <AnimatedView>
      <SubTitle pb={3} color={(theme) => theme.palette.accent.main}>
        {title}
      </SubTitle>

      <InputField
        required
        label="Senha"
        type={'password'}
        placeholder="Digite sua nova senha"
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
        placeholder="Confirme sua nova senha"
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
      {CadastrarButton()}
    </AnimatedView>
  );
};

export default TrocarSenha;
