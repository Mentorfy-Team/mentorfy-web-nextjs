import { FC, useCallback, useState } from 'react';

import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import Clients from './meus-clientes';
import Approvals from './aprovacoes';
import Teams from './meus-times';
import { GetAuthSession } from '~/helpers/AuthSession';
import { CheckForSubscription } from '~/backend/repositories/subscription/CheckForSubscription';
import { SupabaseServer } from '~/backend/supabase';
import isReadOnly from '~/helpers/IsReadOnly';

const tabs = ['Clientes', 'Aprovações', 'Meus Times'];

const ClientsPage: FC<PageTypes.Props> = ({ user }) => {
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
  const supabase = SupabaseServer(ctx.req, ctx.res);
  const accesses = await CheckForSubscription({
    supabase,
    data: {
      user_id: session.user.id,
    },
  });

  const readOnly = isReadOnly(accesses);

  return {
    props: {
      user: session.user,
      accesses,
      readOnly,
    },
  };
};

export default ClientsPage;
