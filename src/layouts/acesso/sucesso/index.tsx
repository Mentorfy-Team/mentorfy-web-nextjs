import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { AcessoSubPage } from '..';
import { LoginButton, SubTitle } from '../styles';

type props = {
  pageChange: (page: AcessoSubPage) => void;
  info: any;
};

const Sucesso: FC<props> = ({ pageChange, info }) => {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <SubTitle pb={3} color={(theme) => theme.palette.accent.main}>
        {info || 'Sucesso! Você já pode continuar.'}
      </SubTitle>

      <LoginButton
        loading={isLoading}
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          route.reload();
          setIsLoading(false);
        }}
      >
        CONTINUAR
      </LoginButton>
    </>
  );
};

export default Sucesso;
