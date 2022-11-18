import { FC, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import dynamic from 'next/dynamic';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import SsrIsLogged from '~/helpers/SsrIsLogged';
import { GetProduct } from '~/services/product.service';
import { GetProfile } from '~/services/profile.service';

import GeralPage from './tabs/geral';
import { GetAuthSession } from '~/helpers/AuthSession';

const LinksPage = dynamic(() => import('./tabs/links'));

enum tabs {
  'Geral',
  'Links',
  'Membros',
}

type props = PageTypes.Props & {
  product: ProductClient.Product;
  tab: string;
};

const EditarProduto: FC<props> = ({ product, tab = tabs.Geral.toString() }) => {
  const [tabindex, setTabindex] = useState<string>(tab);
  const isMobile = useMediaQuery('(max-width: 400px)');

  const SwitchTabs = useCallback(() => {
    switch (tabindex) {
      case tabs.Geral.toString():
        return <GeralPage product={product} />;
      case tabs.Links.toString():
        return <LinksPage product={product} />;
      default:
        return <GeralPage product={product} />;
    }
  }, [product, tabindex]);

  return (
    <>
      <>
        <Toolbar
          onChange={(value) => setTabindex(value.toString())}
          tabs={['Geral', 'Links']}
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
  const product = await GetProduct(ctx.req, ctx.params.id);

  SsrIsLogged(profile);

  return {
    props: {
      profile: profile,
      product: product,
      tab: ctx.query.tab ? tabs[ctx.query.tab as string] : tabs.Geral,
      user,
    },
  };
};

export default EditarProduto;
