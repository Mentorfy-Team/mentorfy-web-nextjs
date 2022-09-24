import { FC, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import dynamic from 'next/dynamic';
import dynamic from 'next/dynamic';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import PageWrapper from '~/components/partials/PageWrapper';
import { MentorRoutes, PublicRoutes } from '~/consts';
import SsrIsLogged from '~/helpers/SsrIsLogged';
import { GetProduct } from '~/services/product.service';
import { GetProfile } from '~/services/profile.service';

import GeralPage from './tabs/geral';

const LinksPage = dynamic(() => import('./tabs/links'));

enum tabs {
  'Geral',
  'Links',
  'Membros',
}

type props = PageTypes.Props & {
  product: ProductClient.Product;
  tab: tabs;
};

const EditarProduto: FC<props> = ({ profile, product, tab = tabs.Geral }) => {
  const [tabindex, setTabindex] = useState<tabs>(tab);
  const isMobile = useMediaQuery('(max-width: 400px)');

  const SwitchTabs = useCallback(() => {
    switch (tabindex) {
      case tabs.Geral:
        return <GeralPage product={product} />;
      case tabs.Links:
        return <LinksPage product={product} />;
      default:
        return <GeralPage product={product} />;
    }
  }, [product, tabindex]);

  return (
    <>
      <>
        <Toolbar
          onChange={(value) => setTabindex(value)}
          tabs={[tabs.Geral, tabs.Links]}
        />
        <ContentWidthLimit maxWidth={700}>
          <Box
            sx={{
              padding: isMobile ? 2 : 4,
              backgroundColor: (theme) => theme.palette.primary.light,
              borderRadius: 1,
            }}
          >
            {SwitchTabs()}
          </Box>
        </ContentWidthLimit>
      </>
    </>
  );
};

// * ServerSideRender (SSR)
export const getProps = withPageAuth({
  authRequired: true,
  redirectTo: PublicRoutes.login,
  async getServerSideProps(ctx) {
    const { profile } = await GetProfile(ctx.req);
    const product = await GetProduct(ctx.req, ctx.params.id);

    SsrIsLogged(profile);

    return {
      props: {
        profile: profile,
        product: product,
        tab: ctx.query.tab ? tabs[ctx.query.tab as string] : tabs.Geral,
      },
    };
  },
});

export default EditarProduto;
