import { FC, useCallback, useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import {
  ContentWidthLimit,
  MiniDrawer,
  PageWrapper,
  TabItem,
  Tabbar,
} from '~/components';
import { Routes } from '~/consts';
import { HeaderWrapper } from './styles';

import GeralPage from './tabs/geral';
import LinksPage from './tabs/links';

enum tabs {
  'Geral',
  'Links',
  'Membros',
}

const EditarProduto: FC = () => {
  const [tabindex, setTabindex] = useState<tabs>(tabs.Geral);
  const [products, setProducts] = useState([]);
  const [openCreatePage, setOpenCreatePage] = useState(false);
  const isMobile = useMediaQuery('(max-width: 400px)');
  const route = useRouter();
  useEffect(() => {}, []);

  const Header = (
    <HeaderWrapper>
      <Typography variant="h6">Mentoria 4S</Typography>
    </HeaderWrapper>
  );

  const SupportHeader = (
    <Tabbar selected={tabindex} onChange={(_, value) => setTabindex(value)}>
      <TabItem label="Geral" />
      <TabItem label="Links" />
      <TabItem label="Área de Membros" />
    </Tabbar>
  );

  const SwitchTabs = useCallback(() => {
    switch (tabindex) {
      case tabs.Geral:
        return <GeralPage />;
      case tabs.Links:
        return <LinksPage />;
      case tabs.Membros:
        route.push(Routes.member_area + '/mentoria-4s');
        break;
      default:
        return <GeralPage />;
    }
  }, [route, tabindex]);

  return (
    <>
      <PageWrapper>
        <MiniDrawer header={Header} supportHeader={SupportHeader}>
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // can also be true or 'blocking'
  };
}

export async function getProps() {
  return {
    props: { post: {} },
  };
}

export default EditarProduto;
