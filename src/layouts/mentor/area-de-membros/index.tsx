import { FC } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { MentorRoutes, PublicRoutes } from '~/consts';
import { useProducts } from '~/hooks/useProducts';
import { GetProfile } from '~/services/profile.service';
import { EmptyBox, ImageButton } from './styles';

const MembersArea: FC<PageTypes.Props> = ({ user }) => {
  const { products } = useProducts(user.id);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const creatNewMembersArea = isMobile ? '' : 'Criar nova área de membros';
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <Toolbar tabs={['Áreas Ativas']} />
      <ContentWidthLimit maxWidth={1250}>
        <Box>
          <Box sx={{ float: 'left' }}>
            <Typography>Minhas Mentorias</Typography>
          </Box>
          {/* <Box sx={{ float: 'right' }}>
            <CreatAreaButton variant="outlined">
              <SvgComponent fill={theme.palette.accent.main} />
              {creatNewMembersArea}
            </CreatAreaButton>
          </Box> */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            overflow: 'auto',
            gap: '2rem',
            marginTop: '1.5rem',
          }}
        >
          {products.map((area, index) => (
            <Box
              onClick={() =>
                router.push(MentorRoutes.members_area_editar + '/' + area.id)
              }
              key={index}
              sx={{ cursor: 'pointer' }}
            >
              <Image
                alt=""
                src={area.main_image}
                style={{
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                }}
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
        <EmptyBox sx={{ backgroundColor: '#36353A' }}>
          <ImageButton>Em breve</ImageButton>
        </EmptyBox>
        {/* <Box sx={{ display: 'flex', flexDirection: 'row', overflow: 'auto' }}>
          {['more-options'].map((index) =>
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
        </Box> */}
      </ContentWidthLimit>
    </>
  );
};

// * ServerSideRender (SSR)
export const getProps = withPageAuth({
  authRequired: true,
  redirectTo: PublicRoutes.login,
  async getServerSideProps(ctx) {
    const { profile } = await GetProfile(ctx.req);
    return {
      props: {
        profile: profile,
      },
    };
  },
});

export default MembersArea;
