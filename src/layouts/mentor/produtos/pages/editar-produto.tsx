import { FC, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Tabbar from '~/components/modules/Tabbar';
import { TabItem } from '~/components/modules/Tabbar/styles';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
import { MentorRoutes, PublicRoutes } from '~/consts';
import { GetProduct } from '~/services/product.service';
import { GetProfile } from '~/services/profile.service';
import { HeaderWrapper, MembersAreaButton } from './styles';

import GeralPage from './tabs/geral';
import graduation_cap_svg from '~/../public/svgs/graduation-cap';

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
  const route = useRouter();

  const Header = (
    <HeaderWrapper>
      <Typography variant="h6">{product.title}</Typography>
      <MembersAreaButton
        sx={{
          float: 'right',
          marginLeft: '1rem',
          height: '2.6rem',
          lineHeight: '1.0rem',
        }}
        variant="contained"
        color="primary"
        onClick={() => route.push(MentorRoutes.members_area + '/mentoria-4s')}
      >
        <SvgIcon
          sx={{ paddingRight: '1rem', width: '40px' }}
          component={graduation_cap_svg}
        />
        Área de Membros
      </MembersAreaButton>
    </HeaderWrapper>
  );

  const SupportHeader = (
    <Tabbar selected={tabindex} onChange={(_, value) => setTabindex(value)}>
      <TabItem label="Geral" />
      <TabItem label="Links" />
    </Tabbar>
  );

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
      <PageWrapper>
        <MiniDrawer
          profile={profile}
          header={Header}
          supportHeader={SupportHeader}
        >
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
        </MiniDrawer>
      </PageWrapper>
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

    return {
      props: {
        profile: profile,
        product: product,
        tab: ctx.query.tab ? tabs[ctx.query.tab as string] : null,
      },
    };
  },
});

export default EditarProduto;
