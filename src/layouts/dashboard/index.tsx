import { FC, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { LoadUserProfile } from '~/backend/users/repository';
import Tabbar from '~/components/modules/Tabbar';
import { TabItem } from '~/components/modules/Tabbar/styles';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
import { Routes } from '~/consts';

type Props = {
  user: UserClient.User;
  profile: UserClient.Profile;
  accessToken: string;
};

const Dashboard: FC<Props> = ({ profile }) => {
  const [tabindex, setTabindex] = useState(0);
  const Header = (
    <Typography variant="h6" noWrap component="div">
      Dashboard
    </Typography>
  );

  const SupportHeader = (
    <Tabbar onChange={(_, value) => setTabindex(value)} selected={tabindex}>
      <TabItem label="Desempenho" />
      <TabItem label="Notificações" />
    </Tabbar>
  );

  return (
    <PageWrapper>
      <MiniDrawer
        profile={profile}
        header={Header}
        supportHeader={SupportHeader}
      ></MiniDrawer>
    </PageWrapper>
  );
};

// * ServerSideRender (SSR)
export const getProps = withPageAuth({
  authRequired: true,
  redirectTo: Routes.login,
  async getServerSideProps(ctx) {
    const profile = await LoadUserProfile(ctx);

    return {
      props: {
        profile,
      },
    };
  },
});

export default Dashboard;
