import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { ContentWidthLimit, MiniDrawer, PageWrapper } from '~/components';
import { TabItem, TabWrapper } from '~/components/modules/Tabbar/styles';
import { EmptyBox, ImageButton } from './style';
import SvgComponent from '~/../public/svgs/graduation-cap';
const AreaDeMembros = () => {
  const Header = <Typography variant="h6">Área de Membros</Typography>;

  const theme = useTheme();
  const SupportHeader = (
    <TabWrapper>
      <TabItem label="Ativos"></TabItem>
    </TabWrapper>
  );

  return (
    <PageWrapper>
      <MiniDrawer header={Header} supportHeader={SupportHeader}>
        <ContentWidthLimit maxWidth={1250}>
          <Box>
            <Box sx={{ float: 'left' }}>
              <Typography>Minhas Mentorias</Typography>
            </Box>
            <Box sx={{ float: 'right' }}>
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  marginRight: '2rem',
                  mb: '1.5rem',
                  gap: '0.5rem',
                }}
              >
                <SvgComponent fill={theme.palette.accent.main} />
                Criar nova área de membros
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row'}}>
            {[1, 2, 3, 4, 5, 6, 7,8,9,10,11].map((index) => (
              <div key={index}>
                <Image
                  alt=""
                  src="/images/area-de-membros.png"
                  width={246}
                  height={244}
                />
              </div>
            ))}
          </Box>
          <Divider sx={{ borderColor: '#36353A', m: '2rem 0rem' }} />
          <Box sx={{ float: 'left' }}>
            <Typography sx={{ mb: '1.5rem' }}>Modelos Prontos</Typography>
          </Box>
          <Grid container>
            <Grid pr="4rem" lg={3}>
              <ImageButton>
                <Image
                  alt=""
                  src="/images/area-de-membros.png"
                  width={246}
                  height={244}
                />
              </ImageButton>
            </Grid>
            <Grid pr="4rem" lg={3}>
              <EmptyBox>
                <Typography>Modelo em Branco</Typography>
              </EmptyBox>
            </Grid>
            <Grid pr="4rem">
              <EmptyBox sx={{ color: 'white', background: 'none' }}>
                <ImageButton>+ Ver mais opções</ImageButton>
              </EmptyBox>
            </Grid>
          </Grid>
        </ContentWidthLimit>
      </MiniDrawer>
    </PageWrapper>
  );
};

export async function getProps() {
  return {
    props: {},
  };
}

export default AreaDeMembros;
