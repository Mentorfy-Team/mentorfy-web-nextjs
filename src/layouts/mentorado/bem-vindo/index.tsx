import { FC } from 'react';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
import {
  BannerBox,
  CollorFullTypography,
  CourseBox,
  CustomTypography,
  LinearProgressBar,
  RatingBox,
} from './style';

const BemVindo: FC = () => {
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

  const TextBanner = (
    <Box sx={{ maxWidth: '14rem', height: '10rem', textAlign: 'start' }}>
      <CollorFullTypography>The World´s Storytelling</CollorFullTypography>
    </Box>
  );
  const ImageBanner = (
    <Box>
      <Image alt="banner" width={50} height={50} src="" />
    </Box>
  );
  return (
    <PageWrapper>
      <MiniDrawer header={Header}>
        <ContentWidthLimit maxWidth={1200}>
          <BannerBox>
            {TextBanner}
            <RatingBox>
              <Rating defaultValue={4.5} precision={0.5} size="small"></Rating>
              <CustomTypography>2022</CustomTypography>
              <CustomTypography>1750 Alunos</CustomTypography>
            </RatingBox>
            <Box
              sx={{ maxWidth: '37.5rem', height: '4.2rem', textAlign: 'start' }}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
              pariatur, doloremque iste corrupti perspiciatis modi, nobis quam
              reprehenderit esse officiis, sequi at exercitationem. Tempora
              architecto dolorem ex laborum, sequi odit?
            </Box>
          </BannerBox>
          <Box sx={{ display: 'flex', margin: '1.2rem 0 0.5rem 0' }}>
            <Typography variant="h5">Meus estudos</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              overflow: 'auto',
              margin: '0 0 1.2rem 0',
            }}
          >
            <CourseBox minWidth={350}>
              <Image
                alt=""
                src="/images/area-de-membros.png"
                width={350}
                height={390}
                objectFit="cover"
              />
            </CourseBox>
            <CourseBox minWidth={350}>
              <Image
                alt=""
                src="/images/imagem2.png"
                width={350}
                height={390}
                objectFit="cover"
              />
            </CourseBox>
            <CourseBox minWidth={350}>
              <Image
                alt=""
                src="/images/imagem3.png"
                width={350}
                height={390}
                objectFit="cover"
              />
            </CourseBox>
            <CourseBox minWidth={350}>
              <Image
                alt=""
                src="/images/imagem3.png"
                width={350}
                height={390}
                objectFit="cover"
              />
            </CourseBox>
            <CourseBox minWidth={350}>
              <Image
                alt=""
                src="/images/imagem3.png"
                width={350}
                height={390}
                objectFit="cover"
              />
            </CourseBox>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h5">Populares na Mentorfy</Typography>
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
