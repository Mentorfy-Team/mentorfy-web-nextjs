import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { MiniDrawer, PageWrapper, Tabbar } from '~/components';
import { TabItem, TabWrapper } from '~/components/modules/Tabbar/styles';
import { ButtonsWrapper, ClientsOptionsButton, Grid, GridWrapper, Item, TextWrapper } from './style';

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
                <>
                <GridWrapper>
                <Grid container spacing={7}  justifyContent='center'>
                    <Grid xs={12} lg={4}>
                        <Item>
                            <TextWrapper>
                                <Typography>Total de Membros</Typography>
                                <Typography sx={{ fontWeight: 600, fontSize: 40}}>273</Typography>
                            </TextWrapper>

                            <Image
                                alt=''
                                src='/svgs/graduation-cap.svg'
                                height={'41px'}
                                width={'51px'}
                            >
                            </Image>
                        </Item>
                    </Grid>

                    <Grid xs={12} lg={4}>
                        <Item>
                            <TextWrapper>
                                <Typography>Total de Membros</Typography>
                                <Typography sx={{ fontWeight: 600, fontSize: 40}}>273</Typography>
                            </TextWrapper>

                            <Image
                                alt=''
                                src='/svgs/graduation-cap.svg'
                                height={'41px'}
                                width={'51px'}
                            >
                            </Image>
                        </Item>
                    </Grid>

                    <Grid xs={12} lg={4}>
                        <Item>
                            <TextWrapper>
                                <Typography>Total de Membros</Typography>
                                <Typography sx={{ fontWeight: 600, fontSize: 40}}>273</Typography>
                            </TextWrapper>

                            <Image
                                alt=''
                                src='/svgs/graduation-cap.svg'
                                height={'41px'}
                                width={'51px'}
                            >
                            </Image>
                        </Item>
                    </Grid>
                </Grid>
                </GridWrapper>
                <ButtonsWrapper>
                    <ClientsOptionsButton variant='outlined'><Image alt='exportar-clientes' src='/svgs/export-clients.svg' height={'22px'} width={'22px'}/>Exportar Clientes</ClientsOptionsButton>
                    <ClientsOptionsButton variant='outlined'><Image alt='exportar-clientes' src='/svgs/filter-clients.svg' height={'22px'} width={'22px'}/>Filtrar Clientes</ClientsOptionsButton>
                    <ClientsOptionsButton variant='contained'><Image alt='exportar-clientes' src='/svgs/plus.svg' height={'31px'} width={'18px'}/>Cadastrar Clientes</ClientsOptionsButton>
                </ButtonsWrapper>
                </>
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
