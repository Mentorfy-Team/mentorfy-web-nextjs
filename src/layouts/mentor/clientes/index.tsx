import { FC, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/future/image';

import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { TabItem, TabWrapper } from '~/components/modules/Tabbar/styles';
import { CustomAppBar } from '~/components/partials/MiniDrawer/components/CustomAppBar';
import { WrapperSupportHeader } from '~/components/partials/MiniDrawer/components/SupportHeader';
import ClientsGrid from './components/ClientsGrid';
import ClientsTable from './components/ClientsTable';
import { ButtonsWrapper, ClientsOptionsButton } from './style';

const Clients: FC = () => {
  const isMobile = useMediaQuery('(max-width: 500px)');

  const ProductsTableComponent = useCallback(() => {
    return <ClientsTable data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />;
  }, []);

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
      <CustomAppBar id="AppBar">
        <Typography variant="h6" color="white" noWrap component="p">
          Clientes
        </Typography>
        {SupportHeader && (
          <WrapperSupportHeader>{SupportHeader}</WrapperSupportHeader>
        )}
      </CustomAppBar>
      <ContentWidthLimit>
        <ClientsGrid />
        <ButtonsWrapper>
          <ClientsOptionsButton variant="outlined">
            <Image
              alt="exportar-clientes"
              src="/svgs/export-clients.svg"
              height={22}
              width={22}
            />
            {exportClientsText}
          </ClientsOptionsButton>
          <ClientsOptionsButton variant="outlined">
            <Image
              alt="exportar-clientes"
              src="/svgs/filter-clients.svg"
              height={22}
              width={22}
            />
            {filterClientsText}
          </ClientsOptionsButton>
          <ClientsOptionsButton variant="contained">
            <Image
              alt="exportar-clientes"
              src="/svgs/plus.svg"
              height={31}
              width={22}
            />
            {createdClientsText}
          </ClientsOptionsButton>
        </ButtonsWrapper>
        <ProductsTableComponent />
      </ContentWidthLimit>
    </>
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
