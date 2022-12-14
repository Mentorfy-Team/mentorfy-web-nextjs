import { FC, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import dynamic from 'next/dynamic';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';

import GeralPage from './tabs/geral';
import { GetAuthSession } from '~/helpers/AuthSession';
import { SupabaseServer } from '~/backend/supabase';
import { GetProductById } from '~/backend/repositories/product/GetProductById';
import { CheckForSubscription } from '~/backend/repositories/subscription/CheckForSubscription';
import isReadOnly from '~/helpers/IsReadOnly';

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

  const supabase = SupabaseServer(ctx.req, ctx.res);
  const product = await GetProductById(supabase, {
    id: ctx.query.id,
  });

  const accesses = await CheckForSubscription({
    supabase,
    data: {
      user_id: session.user.id,
    },
  });

  const readOnly = isReadOnly(accesses);

  return {
    props: {
      product: product,
      tab: ctx.query.tab ? tabs[ctx.query.tab as string] : tabs.Geral,
      user: session.user,
      readOnly,
      accesses,
    },
  };
};

export default EditarProduto;
