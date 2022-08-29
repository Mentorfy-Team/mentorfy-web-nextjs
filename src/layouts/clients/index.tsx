import { FC } from 'react';
import { Typography } from '@mui/material';
import { MiniDrawer, PageWrapper } from '~/components';

const Clients: FC = () => {

    const header = (
        <Typography variant='h6'>
            Meus Clientes
        </Typography>
    );
    return (
        <PageWrapper>
            <MiniDrawer header={header}></MiniDrawer>
        </PageWrapper>
    );
};

export async function getProps() {
    return {
      props: {},
    };
}

export default Clients;
