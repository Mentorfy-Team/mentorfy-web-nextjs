import { FC } from 'react';
import { Tab, Typography } from '@mui/material';
import { MiniDrawer, PageWrapper, Tabbar } from '~/components';

const Clients: FC = () => {

    const header = (
        <Typography variant='h6'>
            Meus Clientes
        </Typography>
    );

    const SupportHeader = (
        <Tabbar value={0}>
          <>
            <Tab label="Desempenho" />
            <Tab label="Notificações" />
          </>
        </Tabbar>
      );

    return (
        <PageWrapper>
            <MiniDrawer header={header} supportHeader={SupportHeader}>
                <div>Meus Clientes</div>
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
