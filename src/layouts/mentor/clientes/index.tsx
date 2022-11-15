import { FC, useCallback, useState } from 'react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import { GetProfile } from '~/services/profile.service';
import Clients from './meus-clientes';
import Approvals from './aprovacoes';

const tabs = ['Clientes', 'Aprovações', 'Meus Times'];

const ClientsPage: FC<PageTypes.Props> = ({ user, access_token }) => {
  const [tabindex, setTabindex] = useState(0);

  const SwitchTabs = useCallback(() => {
    switch (tabindex) {
      case 0:
        return <Clients user={user} />;
      case 1:
        return <Approvals user={user} />;
      default:
        return <Clients user={user} />;
    }
  }, [tabindex, user]);

  // Consts to controll buttons text
  return (
    <>
      <Toolbar onChange={(value) => setTabindex(value)} tabs={tabs} />
      <ContentWidthLimit>{SwitchTabs()}</ContentWidthLimit>
    </>
  );
};

// * ServerSideRender (SSR)
export const getProps = withPageAuth({
  authRequired: true,
  redirectTo: PublicRoutes.login,
  async getServerSideProps(ctx) {
    const { profile, user } = await GetProfile(ctx.req);

    return {
      props: {
        profile,
        user,
      },
    };
  },
});

export default ClientsPage;
