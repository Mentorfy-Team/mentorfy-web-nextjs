import { useEffect, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { UserStore } from '~/stores';
import { SubTitle, Title, Wrapper } from './styles';

const LoginView = ({}): InferGetServerSidePropsType<typeof getProps> => {
  const [state] = useAtom(UserStore.state);

  return (
    <Wrapper>
      <Title>Bem-vindo</Title>
      <SubTitle>Jons</SubTitle>
    </Wrapper>
  );
};

export const getProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default LoginView;
