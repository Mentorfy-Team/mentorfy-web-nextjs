import dynamic from 'next/dynamic';
import { userStore } from '@app/stores';

const Login = dynamic(() => import('../login'));
const Cadastro = dynamic(() => import('../cadastro'));
const EsqueciMinhaSenha = dynamic(() => import('../esqueci-minha-senha'));
const Sucesso = dynamic(() => import('../sucesso'));
const TrocarSenha = dynamic(() => import('../trocar-senha'));
const ConfirmarConta = dynamic(() => import('../confirmar-conta'));

export default (info, setInfo, urlProps) => {
  const {
    appParams: { subpage },
  } = userStore();

  switch (subpage) {
    case 'login':
      return <Login urlProps={urlProps} />;
    case 'cadastro':
      return <Cadastro setInfo={setInfo} urlProps={urlProps} />;
    case 'trocar-senha':
      return (
        <TrocarSenha
          type={urlProps?.type}
          setInfo={setInfo}
          access_token={urlProps?.access_token}
        />
      );
    case 'esqueci-minha-senha':
      return <EsqueciMinhaSenha />;
    case 'confirmar-conta':
      return <ConfirmarConta />;
    case 'sucesso':
      return <Sucesso info={info} />;
    default:
      <div></div>;
  }
};
