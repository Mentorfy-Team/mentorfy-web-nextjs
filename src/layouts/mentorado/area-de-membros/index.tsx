import { FC } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/future/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { CreatAreaButton, EmptyBox, ImageButton } from './style';
import SvgComponent from '~/../public/svgs/graduation-cap';

const AreaDeMembros: FC = () => {
  const isMobile = useMediaQuery('(max-width: 500px)');
  const theme = useTheme();

  const creatNewMembersArea = isMobile ? '' : 'Criar nova área de membros';

  return (
    <>
      <Toolbar tabs={['Ativos']} />
      <ContentWidthLimit maxWidth={1250}>
        <Box>
          <Box sx={{ float: 'left' }}>
            <Typography>Minhas Mentorias</Typography>
          </Box>
          <Box sx={{ float: 'right' }}>
            <CreatAreaButton variant="outlined">
              <SvgComponent fill={theme.palette.accent.main} />
              {creatNewMembersArea}
            </CreatAreaButton>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', overflow: 'auto' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => (
            <Box minWidth={300} mr={4} key={index} sx={{ cursor: 'pointer' }}>
              <Image
                alt=""
                src="/images/area-de-membros.png"
                width={246}
                height={244}
              />
            </Box>
          ))}
        </Box>
        <Divider sx={{ borderColor: '#36353A', m: '2rem 0rem' }} />
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ mb: '1.5rem' }}>Modelos Prontos</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', overflow: 'auto' }}>
          {[1, 2, 3, 4, 5, 'more-options'].map((index) =>
            index === 'more-options' ? (
              <EmptyBox>
                <ImageButton>+ Ver mais opções</ImageButton>
              </EmptyBox>
            ) : (
              <Box minWidth={300} mr={4} key={index} sx={{ cursor: 'pointer' }}>
                <Image
                  alt=""
                  src="/images/area-de-membros.png"
                  width={246}
                  height={244}
                />
              </Box>
            ),
          )}
        </Box>
      </ContentWidthLimit>
    </>
  );
};

export async function getProps() {
  return {
    props: {},
  };
}

export default AreaDeMembros;