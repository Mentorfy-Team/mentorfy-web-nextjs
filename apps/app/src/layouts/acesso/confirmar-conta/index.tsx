import { FC } from 'react';
import { userStore } from '@app/stores';
import { Accent, AnimatedView, InfoText, LoginButton } from '../styles';

const ConfirmarConta: FC = () => {
  const { setAppParams } = userStore();

  return (
    <AnimatedView>
      <InfoText>
        * Caso seu endereço de email esteja correto, enviaremos um email de{' '}
        recuperação de senha para o endereço informado com o titulo{' '}
        <b>
          <Accent>Recuperação de Senha.</Accent>
        </b>
      </InfoText>
      <InfoText>
        * Caso tenha dificuldades, fale com nosso suporte para mais informações
        pelo email:{' '}
        <b>
          <Accent>suporte@mentorfy.io</Accent>
        </b>
      </InfoText>
      <LoginButton onClick={() => setAppParams({ subpage: 'login' })}>
        Voltar ao Login
      </LoginButton>
    </AnimatedView>
  );
};

export default ConfirmarConta;
