import { FC, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';

import dynamic from 'next/dynamic';
import SearchInput from '~/components/atoms/SearchInput';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { useProducts } from '~/hooks/useProducts';
import ProductsTable from './components/ProductsTable';
import { AddProductButton } from './styles';
import PlusSvg from '~/../public/svgs/plus';
import { GetAuthSession } from '~/helpers/AuthSession';
import { SupabaseServer } from '~/backend/supabase';
import { CheckForSubscription } from '~/backend/repositories/subscription/CheckForSubscription';
import isReadOnly from '~/helpers/IsReadOnly';

const CreateProductDialog = dynamic(
  () => import('./components/CreateProductDialog'),
);

const Produtos: FC<PageTypes.Props> = ({ user }) => {
  const [openCreatePage, setOpenCreatePage] = useState(false);
  const { products } = useProducts(user.id);

  const isMobile = useMediaQuery('(max-width: 600px)');

  const ProductsTableComponent = useCallback(() => {
    return <ProductsTable rows={products} />;
  }, [products]);

  return (
    <>
      <Toolbar tabs={['Produtos']} />
      <ContentWidthLimit>
        <Grid container>
          <Grid xs={12} lg={6}>
            <Box sx={{ float: 'left' }}>
              <SearchInput
                sx={{
                  width: isMobile ? '90vw' : 'unset',
                }}
                onChange={(value) => {}}
              />
            </Box>
          </Grid>
          <Grid xs={12} lg={6}>
            <AddProductButton
              sx={{
                float: 'right',
                marginTop: isMobile ? '1rem' : '0px',
              }}
              variant="outlined"
              color="primary"
              onClick={() => setOpenCreatePage(true)}
            >
              <PlusSvg />
              <Typography variant="body2" ml={1}>
                Criar produto
              </Typography>
            </AddProductButton>
          </Grid>
        </Grid>
        <ProductsTableComponent />
      </ContentWidthLimit>
      <CreateProductDialog open={openCreatePage} setOpen={setOpenCreatePage} />
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

export default Produtos;
