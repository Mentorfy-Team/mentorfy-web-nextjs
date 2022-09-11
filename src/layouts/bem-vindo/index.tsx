import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
import { CourseBox, LinearProgressBar } from './style';

const BemVindo = () => {
  const Header = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Typography>Bem-vinda Débora!</Typography>
      <Box sx={{ width: '12rem' }}>
        <Typography variant="body2">Meu progresso de estudo</Typography>
        <Box>
          <LinearProgressBar variant="determinate" value={40} />
          <Typography variant="caption">Nível 3</Typography>
        </Box>
      </Box>
    </Box>
  );
  return (
    <PageWrapper>
      <MiniDrawer header={Header}>
        <ContentWidthLimit maxWidth={1200}>
          <Image
            alt="banner"
            width={1200}
            height={370}
            src="/images/banner.png"
          />
          <Box sx={{ display: 'flex', margin: '1.2rem 0 0.5rem 0'}}>
            <Typography variant="h5">Meus estudos</Typography>
          </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', overflow: 'auto', margin: '0 0 1.2rem 0'}}>
                <CourseBox minWidth={350}><Image alt='' src='/images/area-de-membros.png' width={350} height={390} objectFit='cover'/></CourseBox>
                <CourseBox minWidth={350}><Image alt='' src='/images/imagem2.png' width={350} height={390} objectFit='cover'/></CourseBox>
                <CourseBox minWidth={350}><Image alt='' src='/images/imagem3.png' width={350} height={390} objectFit='cover'/></CourseBox>
                <CourseBox minWidth={350}><Image alt='' src='/images/imagem3.png' width={350} height={390} objectFit='cover'/></CourseBox>
                <CourseBox minWidth={350}><Image alt='' src='/images/imagem3.png' width={350} height={390} objectFit='cover'/></CourseBox>
            </Box>
          <Box sx={{display: 'flex'}}>
            <Typography variant='h5'>Populares na Mentorfy</Typography>
          </Box>
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

export default BemVindo;
