import { FC, useCallback, useState } from 'react';

import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { GetProfile } from '~/services/profile.service';
import Clients from './meus-clientes';
import Approvals from './aprovacoes';
import Teams from './meus-times';
import { GetAuthSession } from '~/helpers/AuthSession';

const tabs = ['Clientes', 'Aprovações', 'Meus Times'];

const ClientsPage: FC<PageTypes.Props> = ({ user, access_token }) => {
  const [tabindex, setTabindex] = useState(0);

  const SwitchTabs = useCallback(() => {
    switch (tabindex) {
      case 0:
        return <Clients user={user} />;
      case 1:
        return <Approvals user={user} />;
      case 2:
        return <Teams user={user} />;
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
export const getProps = async (ctx) => {
  const { session } = await GetAuthSession(ctx);

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const { profile, user } = await GetProfile(ctx.req);

  return {
    props: {
      profile,
      user,
    },
  };
};

export default ClientsPage;
