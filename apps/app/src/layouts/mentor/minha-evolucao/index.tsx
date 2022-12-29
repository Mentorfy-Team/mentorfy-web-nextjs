import { FC } from 'react';
import Toolbar from '@app/components/modules/Toolbar';
import { GetAuthSession } from '@app/helpers/AuthSession';

const Dashboard: FC<PageTypes.Props> = () => {
  return <Toolbar tabs={['Progressão']} />;
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

export default Dashboard;
