import { FC, useState } from 'react';
import Divider from '@mui/material/Divider';
import { AcessoSubPage } from '..';
import {
  Accent,
  CreateAccountButton,
  ForgotPassButton,
  InfoText,
  InputField,
  LoginButton,
  SubTitle,
  Title,
} from '../styles';

type props = {
  pageChange: (page: AcessoSubPage) => void;
  info: any;
};

const Sucesso: FC<props> = ({ pageChange, info }) => {
  const [email, setEmail] = useState('');
  const HandleLogin = (name: string, email: string): void => {};

  return (
    <>
      <SubTitle pb={3} color={(theme) => theme.palette.accent.main}>
        {info || 'Sucesso! Você já pode continuar.'}
      </SubTitle>
      <LoginButton onClick={() => pageChange('login')}>CONTINUAR</LoginButton>
    </>
  );
};

export default Sucesso;
