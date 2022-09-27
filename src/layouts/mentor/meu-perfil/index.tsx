import { FC, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import dynamic from 'next/dynamic';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import SsrIsLogged from '~/helpers/SsrIsLogged';
import { GetProduct } from '~/services/product.service';
import { GetProfile } from '~/services/profile.service';

import GeralPage from './tabs/geral';

const DadosPage = dynamic(() => import('./tabs/dados-cadastro'));

enum tabs {
  'Geral',
  'Links',
  'Membros',
}

type props = PageTypes.Props & {
  product: ProductClient.Product;
  tab: string;
};

const MinhaConta: FC<props> = ({ profile, tab = tabs.Geral.toString(), address, access_token }) => {
  const [tabindex, setTabindex] = useState<string>(tab);
  const isMobile = useMediaQuery('(max-width: 400px)');

  const SwitchTabs = useCallback(() => {
    switch (tabindex) {
      case tabs.Geral.toString():
        return <GeralPage profile={profile}/>;
      case tabs.Links.toString():
        return <DadosPage profile={profile} address={address} access_token={access_token} />;
      default:
        return <GeralPage profile={profile} />;
    }
  }, [tabindex]);

  return (
    <>
        <Toolbar
          onChange={(value) => setTabindex(value.toString())}
          tabs={['Geral', 'Links']}
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
export const getProps = withPageAuth({
  authRequired: true,
  redirectTo: PublicRoutes.login,
  async getServerSideProps(ctx) {
    const { profile, address } = await GetProfile(ctx.req, true);
    return {
      props: { profile, address },
    };
  },
});

export default MinhaConta;
