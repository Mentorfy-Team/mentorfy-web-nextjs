import { FC, useCallback, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import dynamic from 'next/dynamic';
import Image from 'next/future/image';

import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { TabItem, TabWrapper } from '~/components/modules/Tabbar/styles';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
import { PublicRoutes } from '~/consts';
import { useClients } from '~/hooks/useClients';
import { ListClients } from '~/services/client.service';
import { GetProfile } from '~/services/profile.service';
import ClientsGrid from './components/ClientsGrid';
import ClientsTable from './components/ClientsTable';
import { ButtonsWrapper, ClientsOptionsButton } from './style';

const CreateClientDialog = dynamic(
  () => import('./components/CreateClientDialog'),
);

const Clients: FC<PageTypes.Props> = ({ profile, user, access_token }) => {
  const isMobile = useMediaQuery('(max-width: 500px)');
  const [openCreatePage, setOpenCreatePage] = useState(false);
  const { clients } = useClients(user.id);

  const ProductsTableComponent = useCallback(() => {
    return <ClientsTable rows={clients} />;
  }, [clients]);

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
    <>
      <PageWrapper>
        <>
          <ContentWidthLimit>
            <ClientsGrid
              mentorados={clients.length}
              acessos={clients.length * 4}
              alunos={clients.length}
            />
            <ButtonsWrapper>
              <ClientsOptionsButton variant="outlined">
                <Image
                  alt="exportar-clientes"
                  src="/svgs/export-clients.svg"
                  height={16}
                  width={16}
                />
                {exportClientsText}
              </ClientsOptionsButton>
              <ClientsOptionsButton variant="outlined">
                <Image
                  alt="filtrar-clientes"
                  src="/svgs/filter-clients.svg"
                  height={16}
                  width={16}
                />
                {filterClientsText}
              </ClientsOptionsButton>
              <ClientsOptionsButton
                onClick={() => setOpenCreatePage(true)}
                variant="contained"
              >
                <Image
                  alt="criar-clientes"
                  src="/svgs/plus.svg"
                  height={12}
                  width={12}
                />
                {createdClientsText}
              </ClientsOptionsButton>
            </ButtonsWrapper>
            <ProductsTableComponent />
          </ContentWidthLimit>
        </>
      </PageWrapper>
      {openCreatePage && (
        <CreateClientDialog
          open={openCreatePage}
          setOpen={setOpenCreatePage}
          onUpdate={() => {}}
          user={user}
          access_token={access_token}
        />
      )}
    </>
  );
};

// * ServerSideRender (SSR)
export const getProps = withPageAuth({
  authRequired: true,
  redirectTo: PublicRoutes.login,
  async getServerSideProps(ctx) {
    const { profile, user } = await GetProfile(ctx.req);

    return {
      props: {
        profile,
        user,
      },
    };
  },
});

export default Clients;
