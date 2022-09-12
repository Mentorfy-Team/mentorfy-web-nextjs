import { FC, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  supabaseServerClient,
  withPageAuth,
} from '@supabase/auth-helpers-nextjs';
import { InferGetServerSidePropsType } from 'next';
import Tabbar from '~/components/modules/Tabbar';
import { TabItem } from '~/components/modules/Tabbar/styles';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
import { LoadUserProfile } from '~/helpers/ssrDefaultProps';

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

  useEffect(() => {
    console.log('profile', profile);
  }, [profile]);

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
  redirectTo: '/',
  async getServerSideProps(ctx) {
    const supabase = await supabaseServerClient(ctx);
    const { user, token } = await supabase.auth.api.getUserByCookie(ctx.req);

    const profile = await LoadUserProfile(supabase, user.id);

    return {
      props: {
        profile,
      },
    };
  },
});

export default Dashboard;
