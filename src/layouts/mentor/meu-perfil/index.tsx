import { FC, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';

import GeralPage from './tabs/geral';
import { GetAuthSession } from '~/helpers/AuthSession';
import { useProfile } from '~/hooks/useProfile';

const DadosPage = dynamic(() => import('./tabs/dados-cadastro'));

enum tabs {
  'Geral',
  'Links',
  'Membros',
}

type props = PageTypes.Props & {
  product: ProductClient.Product;
  tab: string;
  mentored_id?: string;
  isViewingMentored: boolean;
};

const MinhaConta: FC<props> = ({
  user,
  tab = tabs.Geral.toString(),
  isViewingMentored,
  mentored_id,
}) => {
  const [tabindex, setTabindex] = useState<string>(tab);
  const {
    data: { profile, address },
  } = useProfile(true, mentored_id || user.id);

  const SwitchTabs = useCallback(() => {
    switch (tabindex) {
      case tabs.Geral.toString():
        return (
          <GeralPage
            isViewingMentored={isViewingMentored}
            user={user}
            profile={profile}
          />
        );
      case tabs.Links.toString():
        return <DadosPage profile={profile} address={address} />;
      default:
        return (
          <GeralPage
            isViewingMentored={isViewingMentored}
            user={user}
            profile={profile}
          />
        );
    }
  }, [address, isViewingMentored, profile, tabindex, user]);

  return (
    <>
      <Toolbar
        onChange={(value) => setTabindex(value.toString())}
        tabs={['Perfil', 'Dados de Cadastro']}
      />
      <ContentWidthLimit>
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.primary.light,
            borderRadius: 1,
          }}
        >
          {SwitchTabs()}
        </Box>
      </ContentWidthLimit>
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

  return {
    props: { user: session.user, mentored_id: ctx.query.altId ?? null },
  };
};

export default MinhaConta;
