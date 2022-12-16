import { FC } from 'react';
import Toolbar from '~/components/modules/Toolbar';
import { GetAuthSession } from '~/helpers/AuthSession';

const Plans: FC<PageTypes.Props> = () => {
  return <Toolbar tabs={['Gerienciamento de Assinatura']} />;
};

// * ServerSideRender (SSR)
export const getProps = async (ctx) => {
  const { session } = await GetAuthSession(ctx);

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

export default Plans;
