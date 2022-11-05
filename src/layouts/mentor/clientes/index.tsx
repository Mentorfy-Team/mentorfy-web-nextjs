import { FC, useCallback, useState } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import dynamic from 'next/dynamic';
import Image from 'next/future/image';

import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import ModalComponent from '~/components/modules/Modal';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import { useClients } from '~/hooks/useClients';
import { GetProfile } from '~/services/profile.service';
import { userStore } from '~/stores';
import { DeleteText } from '../area-de-membros/components/GroupModal/styles';
import ClientsGrid from './components/ClientsGrid';
import ClientsTable from './components/ClientsTable';
import { ButtonsWrapper, ClientsOptionsButton } from './style';

const CreateClientDialog = dynamic(
  () => import('./components/CreateClientDialog'),
);

const Clients: FC<PageTypes.Props> = ({ user, access_token }) => {
  const isMobile = useMediaQuery('(max-width: 500px)');
  const [openCreatePage, setOpenCreatePage] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { clients, mutate, isLoading } = useClients(user.id);
  const [selectedClient, setSelectedClient] = useState(null);
  // userStore
  const { setLoading } = userStore();

  const handleSeeMore = useCallback((id) => {}, []);

  const handleRemove = useCallback((id) => {
    setShowConfirmDelete(true);
    setSelectedClient(id);
  }, []);

  const confirmDeleteClient = useCallback(async () => {
    fetch(`/api/clients?owner_id=${user.id}&client_id=${selectedClient}`, {
      method: 'DELETE',
    });
    setLoading(true);
    await mutate();
    setShowConfirmDelete(false);
    setLoading(false);
  }, [mutate, selectedClient, setLoading, user]);

  const ProductsTableComponent = useCallback(() => {
    return (
      <ClientsTable
        rows={clients}
        clickSeeMore={(id) => handleSeeMore(id)}
        clickRemove={(id) => handleRemove(id)}
      />
    );
  }, [clients, handleRemove, handleSeeMore]);

  // Consts to controll buttons text
  const exportClientsText = isMobile ? '' : 'Exportar Clientes';
  const filterClientsText = isMobile ? '' : 'Filtrar Clientes';
  const createdClientsText = isMobile ? '' : 'Cadastrar Clientes';
  return (
    <>
      <Toolbar tabs={['Clientes', 'Aprovações', 'Meus Times']} />
      <Box sx={{ paddingTop: '2rem' }}>
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
      </Box>
      {openCreatePage && (
        <CreateClientDialog
          open={openCreatePage}
          setOpen={setOpenCreatePage}
          onUpdate={() => mutate()}
          user={user}
        />
      )}
      <ModalComponent
        onDelete={() => confirmDeleteClient()}
        onSave={() => {
          setShowConfirmDelete(false);
        }}
        open={showConfirmDelete}
        setOpen={setShowConfirmDelete}
        title="Remover Cliente"
        deleteMessage={true}
      >
        <Box sx={{ textAlign: 'center' }}>
          <DeleteText>
            Ao remover, esse cliente perderá todos os acessos a todas as
            mentorias vinculadas a você. Deseja continuar mesmo assim?
          </DeleteText>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              color: 'caption.main',
            }}
          >
            Se desejar apenas remover o acesso a uma mentoria, acesse a página
            da mentoria e remova o acesso.
          </Typography>
        </Box>
      </ModalComponent>
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
