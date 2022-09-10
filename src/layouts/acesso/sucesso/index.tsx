import { FC } from 'react';
import { useRouter } from 'next/router';
import { Routes } from '~/consts';
import { AcessoSubPage } from '..';
import { LoginButton, SubTitle } from '../styles';

type props = {
  pageChange: (page: AcessoSubPage) => void;
  info: any;
};

const Sucesso: FC<props> = ({ pageChange, info }) => {
  const route = useRouter();

  return (
    <>
      <SubTitle pb={3} color={(theme) => theme.palette.accent.main}>
        {info || 'Sucesso! Você já pode continuar.'}
      </SubTitle>
      <LoginButton onClick={() => route.push(Routes.home)}>
        CONTINUAR
      </LoginButton>
    </>
  );
};

export default Sucesso;
