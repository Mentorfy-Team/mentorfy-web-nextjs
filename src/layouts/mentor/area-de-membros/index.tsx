import { FC, useState } from 'react';
import { DeleteForever } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import ModalComponent from '~/components/modules/Modal';
import { PublicRoutes } from '~/consts';
import { useProducts } from '~/hooks/useProducts';
import { GetProfile } from '~/services/profile.service';
import CreateProductDialog from './components/CreateProductDialog';
import { DeleteText } from './components/GroupModal/styles';
import {
  AbsoluteBottomBox,
  AbsoluteTopBox,
  AreaWrapper,
  CollorFullMentorfy,
  CreatAreaButton,
  EmptyBox,
  ImageButton,
  ProductTitle,
} from './styles';
import PlusSvg from '~/../public/svgs/plus';

const MembersArea: FC<PageTypes.Props> = ({ user }) => {
  const { products, mutate } = useProducts(user.id);
  const router = useRouter();
  const theme = useTheme();
  const [openCreatePage, setOpenCreatePage] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [productId, setProductId] = useState('');

  const handleDeleteProduct = async (id: string) => {
    setProductId(id);
    setShowConfirmDelete(true);
  };

  const confirmDeleteProduct = async () => {
    setShowConfirmDelete(false);
    await fetch(`/api/products?id=${productId}`, {
      method: 'DELETE',
    });
    mutate();
  };

  return (
    <>
      <ContentWidthLimit withoutScroll maxWidth={1900}>
        <Box mt={3}>
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
            overflowY: 'hidden',
            height: '100%',
            gap: '2rem',
          }}
        >
          {products?.map((area, index) => (
            <AreaWrapper
              onClick={
                () => {}
                // router.push(MentorRoutes.members_area_editar + '/' + area.id)
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
                  width={300}
                  height={400}
                />
              )}
              {!area.main_image && (
                <Box
                  sx={{
                    // gradiente azul e laranja
                    background:
                      'linear-gradient(180deg, #464646 0%, #161616 100%)',
                  }}
                  width={300}
                  height={400}
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
              {area.relations?.length === 0 && (
                <DeleteForever
                  className="delete-icon"
                  color="error"
                  style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '15px',
                    opacity: 0.5,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProduct(area.id);
                  }}
                />
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
      <ModalComponent
        onDelete={() => confirmDeleteProduct()}
        onSave={() => setShowConfirmDelete(false)}
        open={showConfirmDelete}
        title="Remover Mentoria"
        deleteMessage={true}
      >
        <Box sx={{ textAlign: 'center' }}>
          <DeleteText>
            Ao remover, você perderá todos os dados relacionados a essa
            mentoria. Deseja continuar mesmo assim?
          </DeleteText>
        </Box>
      </ModalComponent>
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
