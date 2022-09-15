import { FC, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Tabbar from '~/components/modules/Tabbar';
import { TabItem } from '~/components/modules/Tabbar/styles';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
import { MentorRoutes } from '~/consts';
import { HeaderWrapper, MembersAreaButton } from './styles';

import GeralPage from './tabs/geral';
import graduation_cap_svg from '~/../public/svgs/graduation-cap';

const LinksPage = dynamic(() => import('./tabs/links'));

enum tabs {
  'Geral',
  'Links',
  'Membros',
}

const EditarProduto: FC = () => {
  const [tabindex, setTabindex] = useState<tabs>(tabs.Geral);
  const isMobile = useMediaQuery('(max-width: 400px)');
  const route = useRouter();

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

export async function getProps() {
  return {
    props: { post: {} },
  };
}

export default EditarProduto;
