import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { AnimatedView, LoginButton, SubTitle } from '../styles';
import { userStore } from '@app/stores';

type props = {
  info: any;
};

const Sucesso: FC<props> = ({ info }) => {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setAppParams } = userStore();

  return (
    <AnimatedView
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: '-webkit-center',
      }}
    >
      <SubTitle pb={3} color={(theme) => theme.palette.accent.main}>
        {info || 'Sucesso! Você já pode continuar.'}
      </SubTitle>

      <LoginButton
        loading={isLoading}
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          setAppParams({ subpage: 'login', signup: null });
          route.reload();
          setIsLoading(false);
        }}
      >
        CONTINUAR
      </LoginButton>
    </AnimatedView>
  );
};

export default Sucesso;
