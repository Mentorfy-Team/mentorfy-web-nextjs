import { FC } from 'react';
import Typography from '@mui/material/Typography';
import Toolbar from '~/components/modules/Toolbar';
import { GetAuthSession } from '~/helpers/AuthSession';

const Dashboard: FC<PageTypes.Props> = () => {
  const Header = (
    <Typography variant="h6" noWrap component="div">
      Faturamento
    </Typography>
  );

  return <Toolbar tabs={['Geral']} />;
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
