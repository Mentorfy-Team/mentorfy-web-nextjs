import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { MiniDrawer, PageWrapper, Tabbar } from '~/components';
import { TabItem, TabWrapper } from '~/components/modules/Tabbar/styles';
import { Grid, GridWrapper, Item, TextWrapper } from './sty';

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
                <GridWrapper>
                <Grid container spacing={8}>
                    <Grid xs={4}>
                        <Item>
                            <TextWrapper>
                                <Typography>Total de Membros</Typography>
                                <Typography variant='h4'>273</Typography>
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

                    <Grid xs={4}>
                    <Item>
                            <TextWrapper>
                                <Typography>Total de Membros</Typography>
                                <Typography variant='h4'>273</Typography>
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

                    <Grid xs={4}>
                    <Item>
                            <TextWrapper>
                                <Typography>Total de Membros</Typography>
                                <Typography variant='h4'>273</Typography>
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
