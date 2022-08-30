import { FC } from 'react';
import { Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MiniDrawer, PageWrapper, Tabbar } from '~/components';
import { TabItem, TabWrapper } from '~/components/modules/Tabbar/styles';

const Clients: FC = () => {

    const Header = (
            <Typography  variant='h6'>
                Meus Clientes
            </Typography>
    );

    const SupportHeader = (
        <TabWrapper>
            <TabItem label="Lista de Clientes"/>
            <TabItem label="Aprovações"/>
            <TabItem label="Meus Times"/>
        </TabWrapper>
    );
    return (
        <PageWrapper>
            <MiniDrawer header={Header} supportHeader={SupportHeader}>
                <input></input>
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
