import { FC, useCallback } from 'react';
import { Box, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import {
  ContentWidthLimit,
  MiniDrawer,
  PageWrapper,
  Tabbar,
} from '~/components';
import { TabItem, TabWrapper } from '~/components/modules/Tabbar/styles';
import ProductsTable from './components/ProductsTable';
import {
  ButtonsWrapper,
  ClientsOptionsButton,
  Grid,
  GridWrapper,
  Item,
  TextWrapper,
  Wrapper,
} from './style';
import { graduation_cap_svg } from '~/../public/svgs';

const Clients: FC = () => {
  const isMobile = useMediaQuery('(max-width: 500px)');

  const ProductsTableComponent = useCallback(() => {
    return <ProductsTable />;
  }, []);
  const Header = <Typography variant="h6">Meus Clientes</Typography>;

  const SupportHeader = (
    <TabWrapper>
      <TabItem label="Lista de Clientes" />
      <TabItem label="Aprovações" />
      <TabItem label="Meus Times" />
    </TabWrapper>
  );

  // Consts to controll buttons text
  const exportClientsText = isMobile ? '' : 'Exportar Clientes';
  const filterClientsText = isMobile ? '' : 'Filtrar Clientes';
  const createdClientsText = isMobile ? '' : 'Cadastrar Clientes';
  return (
    <PageWrapper>
      <MiniDrawer header={Header} supportHeader={SupportHeader}>
        <ContentWidthLimit>
          <Grid container spacing={!isMobile ? 7 : 2}>
            <Grid p={isMobile ? 0 : null} xs={4} lg={4}>
              <Item>
                <TextWrapper>
                  <Typography variant="body2">Total de Membros</Typography>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: isMobile ? 26 : 40 }}
                  >
                    273
                  </Typography>
                </TextWrapper>

                {!isMobile && <SvgIcon alt="" component={graduation_cap_svg} />}
              </Item>
            </Grid>

            <Grid p={isMobile ? 0 : null} xs={4} lg={4}>
              <Item>
                <TextWrapper>
                  <Typography variant="body2">Total de Membros</Typography>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: isMobile ? 26 : 40 }}
                  >
                    273
                  </Typography>
                </TextWrapper>

                {!isMobile && <SvgIcon alt="" component={graduation_cap_svg} />}
              </Item>
            </Grid>

            <Grid p={isMobile ? 0 : null} xs={4} lg={4}>
              <Item>
                <TextWrapper>
                  <Typography variant="body2">Total de Membros</Typography>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: isMobile ? 26 : 40 }}
                  >
                    273
                  </Typography>
                </TextWrapper>

                {!isMobile && <SvgIcon alt="" component={graduation_cap_svg} />}
              </Item>
            </Grid>
          </Grid>
          <ButtonsWrapper>
            <ClientsOptionsButton variant="outlined">
              <Image
                alt="exportar-clientes"
                src="/svgs/export-clients.svg"
                height={'22px'}
                width={'22px'}
              />
              {exportClientsText}
            </ClientsOptionsButton>
            <ClientsOptionsButton variant="outlined">
              <Image
                alt="exportar-clientes"
                src="/svgs/filter-clients.svg"
                height={'22px'}
                width={'22px'}
              />
              {filterClientsText}
            </ClientsOptionsButton>
            <ClientsOptionsButton variant="contained">
              <Image
                alt="exportar-clientes"
                src="/svgs/plus.svg"
                height={'31px'}
                width={'18px'}
              />
              {createdClientsText}
            </ClientsOptionsButton>
          </ButtonsWrapper>
          <ProductsTableComponent />
        </ContentWidthLimit>
      </MiniDrawer>
    </PageWrapper>
  );
};

export async function getProps() {
  return {
    props: {},
  };
}

export default Clients;
function px(arg0: number, arg1: number, px: any) {
  throw new Error('Function not implemented.');
}
