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
import { HeaderWrapper } from '../produtos/styles';

import CreateMemberDialog from './components/CreateMemberDialog';
import SelectActiveProduct from './components/SelectActiveProduct';
import { AddMemberButton, CopyLinkButton } from './styles';
import JorneyPage from './tabs/jorney';
import ModePage from './tabs/mode';
import { add_user_svg, copy_link_svg, plus_svg } from '~/../public/svgs';

enum tabs {
  'Geral',
  'Links',
  'Membros',
}

const EditarProduto: FC = () => {
  const [tabindex, setTabindex] = useState<tabs>(tabs.Geral);
  const [products, setProducts] = useState([]);
  const [openCreatePage, setOpenCreatePage] = useState(false);
  const isMobile = useMediaQuery('(max-width: 500px)');
  const route = useRouter();
  useEffect(() => {}, []);

  const Header = (
    <HeaderWrapper>
      <SelectActiveProduct />
      <Box>
        {!isMobile ? (
          <AddMemberButton
            sx={{
              float: 'right',
              marginLeft: '2rem',
              height: '2.6rem',
              lineHeight: '1.0rem',
            }}
            variant="contained"
            color="primary"
            onClick={() => setOpenCreatePage(true)}
          >
            <SvgIcon sx={{ paddingTop: '0.4rem' }} component={plus_svg} />
            Adicionar Membro
          </AddMemberButton>
        ) : (
          <SvgIcon onClick={() => {}} component={copy_link_svg} />
        )}
        {!isMobile ? (
          <CopyLinkButton
            sx={{
              float: 'right',
              marginLeft: '1rem',
              height: '2.6rem',
              lineHeight: '1.0rem',
            }}
            variant="text"
            color="primary"
            onClick={() => {}}
          >
            <SvgIcon
              sx={{ paddingRight: '1rem', width: '50px' }}
              component={copy_link_svg}
            />
            Copiar link de cadastro
          </CopyLinkButton>
        ) : (
          <SvgIcon
            onClick={() => setOpenCreatePage(true)}
            sx={{ marginLeft: '1.5rem' }}
            component={add_user_svg}
          />
        )}
      </Box>
    </HeaderWrapper>
  );

  const SupportHeader = (
    <Tabbar selected={tabindex} onChange={(_, value) => setTabindex(value)}>
      <TabItem label="Modo Kanban" />
      <TabItem label="Jornada do Cliente" />
    </Tabbar>
  );

  const SwitchTabs = useCallback(() => {
    switch (tabindex) {
      case tabs.Geral:
        return <ModePage />;
      case tabs.Links:
        return <JorneyPage />;
      case tabs.Membros:
        route.push(Routes.member_area + '/mentoria-4s');
        break;
      default:
        return <ModePage />;
    }
  }, [route, tabindex]);

  return (
    <>
      <PageWrapper>
        <MiniDrawer header={Header} supportHeader={SupportHeader}>
          <ContentWidthLimit maxWidth={1920}>
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
      <CreateMemberDialog open={openCreatePage} setOpen={setOpenCreatePage} />
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
