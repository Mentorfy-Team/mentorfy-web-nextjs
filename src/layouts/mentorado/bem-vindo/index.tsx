import { FC } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import PageWrapper from '~/components/partials/PageWrapper';
import {
  BannerBox,
  CollorFullTypography,
  CourseBox,
  CustomTypography,
  RatingBox,
} from './style';

const BemVindo: FC = () => {

  const TextBanner = (
    <Box sx={{ maxWidth: '16.5rem', height: '8rem', textAlign: 'start'}}>
      <CollorFullTypography>The World´s Storytelling</CollorFullTypography>
    </Box>
  );

  return (
    <PageWrapper>
      <BannerBox sx={{marginTop: '3.1rem', display: 'flex', justifyContent: 'center'}}>
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
      <ContentWidthLimit maxWidth='100%'>
      {/* // TODO: fix 'Meus estudos' margin-top when it´s mobile */}
        <Box sx={{ display: 'flex', margin: '1.2rem 0 0.5rem 0' }}>
          <Typography variant="h5">Meus estudos</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            margin: '0 0 1.2rem 0',
            overflow: 'auto'
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
      </PageWrapper>
  );
};

export async function getProps() {
  return {
    props: {},
  };
}

export default BemVindo;
