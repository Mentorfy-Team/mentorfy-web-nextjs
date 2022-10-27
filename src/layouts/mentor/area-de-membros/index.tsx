import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { MentorRoutes, PublicRoutes } from '~/consts';
import { useProducts } from '~/hooks/useProducts';
import { GetProfile } from '~/services/profile.service';
import CreateProductDialog from './components/CreateProductDialog';
import { AbsoluteBottomBox, AbsoluteTopBox, AreaWrapper, CollorFullMentorfy, CreatAreaButton, EmptyBox, ImageButton, ProductTitle } from './styles';
import PlusSvg from '~/../public/svgs/plus';

const MembersArea: FC<PageTypes.Props> = ({ user }) => {
  const { products } = useProducts(user.id);
  const router = useRouter();
  const theme = useTheme();
  const [openCreatePage, setOpenCreatePage] = useState(false);

  return (
    <>
      <Toolbar tabs={['Áreas Ativas']} />
      <ContentWidthLimit maxWidth={1900}>
        <Box>
          <Box sx={{ float: 'left' }}>
            <Typography>Minhas Mentorias</Typography>
          </Box>
          <Box sx={{ float: 'right' }} onClick={() => setOpenCreatePage(true)}>
            <CreatAreaButton variant="outlined">
              <PlusSvg fill={theme.palette.accent.main} />
              Criar Mentoria
            </CreatAreaButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            overflow: 'auto',
            overflowY: 'visible',
            gap: '2rem',
            marginTop: '1.5rem',
          }}
        >
          {products?.map((area, index) => (
            <AreaWrapper
              onClick={() =>
                router.push(MentorRoutes.members_area_editar + '/' + area.id)
              }
              key={index}
            >
              {area.main_image && (
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
              )}
              {!area.main_image && (
                <Box
                  sx={{
                    // gradiente azul e laranja
                    background:
                      'linear-gradient(180deg, #464646 0%, #161616 100%)',
                  }}
                  width={246}
                  height={244}
                />
              )}
              <AbsoluteTopBox>
                <CollorFullMentorfy>
                  Mentor<span>fy</span>
                </CollorFullMentorfy>
              </AbsoluteTopBox>
              {!area?.banner_image && (
                <AbsoluteBottomBox>
                  <ProductTitle>{area?.title}</ProductTitle>
                </AbsoluteBottomBox>
              )}
            </AreaWrapper>
          ))}
        </Box>
        <Divider sx={{ borderColor: '#36353A', m: '2rem 0rem' }} />
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ mb: '1.5rem' }}>Modelos Prontos</Typography>
        </Box>
        <EmptyBox sx={{ backgroundColor: '#36353a50' }}>
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
      <CreateProductDialog open={openCreatePage} setOpen={setOpenCreatePage} />
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
