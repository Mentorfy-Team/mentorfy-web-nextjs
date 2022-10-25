import dynamic from 'next/dynamic';

const Login = dynamic(() => import('../login'));
const Cadastro = dynamic(() => import('../cadastro'));
const EsqueciMinhaSenha = dynamic(() => import('../esqueci-minha-senha'));
const Sucesso = dynamic(() => import('../sucesso'));
const TrocarSenha = dynamic(() => import('../trocar-senha'));
const ConfirmarConta = dynamic(() => import('../confirmar-conta'));

export default (AcessosubPage, setAcessoSubPage, info, setInfo, urlProps) => {
  if (
    (urlProps?.type === 'recovery' || urlProps?.type === 'invite') &&
    AcessosubPage !== 'sucesso'
  ) {
    AcessosubPage = 'trocar-senha';
  }
  switch (AcessosubPage) {
    case 'login':
      return <Login pageChange={setAcessoSubPage} />;
    case 'cadastro':
      return <Cadastro setInfo={setInfo} pageChange={setAcessoSubPage} />;
    case 'trocar-senha':
      return (
        <TrocarSenha
          type={urlProps?.type}
          setInfo={setInfo}
          pageChange={setAcessoSubPage}
          access_token={urlProps?.access_token}
        />
      );
    case 'esqueci-minha-senha':
      return <EsqueciMinhaSenha pageChange={setAcessoSubPage} />;
    case 'confirmar-conta':
      return <ConfirmarConta pageChange={setAcessoSubPage} />;
    case 'sucesso':
      return <Sucesso info={info} pageChange={setAcessoSubPage} />;
  }
};
