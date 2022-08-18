import { useEffect, useState } from 'react';
import { InferGetStaticPropsType } from 'next';
import { userStore } from '~/stores';
import { Grid, LogInOutButton, LoginInput, SubTitle, Title } from './styles';

function LoginView({}: InferGetStaticPropsType<typeof getProps>) {
  const { saveUser, removeUser, user } = userStore();
  const [email, setEmail] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const HandleLogin = (name: string, email: string): void => {
    saveUser({ name, email });
  };

  const HandleLogout = (): void => {
    removeUser();
  };

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <Grid container spacing={2}>
      <Grid xs={12} lg={6}>
        {true && (
          <>
            <Title>Bem-vindo</Title>
            <SubTitle>{currentUser?.name}</SubTitle>
            <LogInOutButton
              style={{ background: 'gray', color: 'white' }}
              onClick={() => HandleLogout()}
            >
              SAIR
            </LogInOutButton>
          </>
        )}
      </Grid>

      <Grid
        display={'flex'}
        flexDirection="column"
        order={{ sx: 2, lg: 2 }}
        xs={12}
        lg={6}
      >
        <Title>Mentorfy</Title>
        <LoginInput
          required
          id="outlined-required"
          label="E-mail"
          placeholder="Digite seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <LogInOutButton
          style={{ background: 'gray', color: 'white' }}
          onClick={() => HandleLogin(email, email)}
        >
          ENTRAR
        </LogInOutButton>
      </Grid>
    </Grid>
  );
}

export async function getProps() {
  return {
    props: {},
    revalidate: 1,
  };
}

export default LoginView;
