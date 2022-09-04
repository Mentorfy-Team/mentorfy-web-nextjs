import { FC, useCallback, useEffect, useState } from 'react';
import { Box, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import {
  ContentWidthLimit,
  MiniDrawer,
  PageWrapper,
  TabItem,
  Tabbar,
} from '~/components';
import { Routes } from '~/consts';
import { MembersAreaButton } from '../styles';
import { HeaderWrapper } from './styles';

import GeralPage from './tabs/geral';
import LinksPage from './tabs/links';
import { graduation_cap_svg } from '~/../public/svgs';

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
      <MembersAreaButton
        sx={{
          float: 'right',
          marginLeft: '1rem',
          height: '2.6rem',
          lineHeight: '1.0rem',
        }}
        variant="contained"
        color="primary"
        onClick={() => route.push(Routes.member_area + '/mentoria-4s')}
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
        return <GeralPage />;
      case tabs.Links:
        return <LinksPage />;
      default:
        return <GeralPage />;
    }
  }, [tabindex]);

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