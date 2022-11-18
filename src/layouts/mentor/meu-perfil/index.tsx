import { FC, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import dynamic from 'next/dynamic';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { GetProfile } from '~/services/profile.service';

import GeralPage from './tabs/geral';
import { GetAuthSession } from '~/helpers/AuthSession';

const DadosPage = dynamic(() => import('./tabs/dados-cadastro'));

enum tabs {
  'Geral',
  'Links',
  'Membros',
}

type props = PageTypes.Props & {
  product: ProductClient.Product;
  tab: string;
  isViewingMentored: boolean;
};

const MinhaConta: FC<props> = ({
  user,
  profile,
  tab = tabs.Geral.toString(),
  address,
  access_token,
  isViewingMentored,
}) => {
  const [tabindex, setTabindex] = useState<string>(tab);
  const isMobile = useMediaQuery('(max-width: 400px)');

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
        return (
          <DadosPage
            profile={profile}
            address={address}
            access_token={access_token}
          />
        );
      default:
        return (
          <GeralPage
            isViewingMentored={isViewingMentored}
            user={user}
            profile={profile}
          />
        );
    }
  }, [access_token, address, isViewingMentored, profile, tabindex, user]);

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

  const id = ctx.query.id;
  const { profile, address, user } = await GetProfile(ctx.req, true, id);
  return {
    props: { profile, address, isViewingMentored: !!id, user },
  };
};

export default MinhaConta;
