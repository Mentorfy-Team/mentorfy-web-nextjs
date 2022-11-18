import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import ModalComponent from '~/components/modules/Modal';
import { MentorRoutes } from '~/consts';
import { useProducts } from '~/hooks/useProducts';
import { GetProfile } from '~/services/profile.service';
import CreateProductDialog from './components/CreateProductDialog';
import { DeleteText } from './components/GroupModal/styles';
import {
  AbsoluteBottomBox,
  AbsoluteTopBox,
  AreaWrapper,
  CollorFullMentorfy,
  CreateAreaButton,
  DeleteAreaButton,
  EmptyBox,
  ImageButton,
  ProductTitle,
  ProductsSelectField,
} from './styles';
import PlusSvg from '~/../public/svgs/plus';
import { GetAuthSession } from '~/helpers/AuthSession';

const MembersArea: FC<PageTypes.Props> = ({ user }) => {
  const { products, mutate } = useProducts(user.id);
  const router = useRouter();
  const theme = useTheme();
  const [openCreatePage, setOpenCreatePage] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [productId, setProductId] = useState('');
  const [open, setOpen] = useState(false);

  const handleDeleteProduct = async (id: string) => {
    setProductId(id);
    setShowConfirmDelete(true);
  };

  const confirmDeleteProduct = async () => {
    if (!showConfirmDelete) {
      setShowConfirmDelete(true);
    } else {
      await fetch(`/api/products?id=${productId}`, {
        method: 'DELETE',
      });
      toast.success('Alterações salvas com sucesso');
      mutate();
      setOpen(false);
      setShowConfirmDelete(false);
    }
  };

  return (
    <>
      <ContentWidthLimit withoutScroll maxWidth={1900}>
        <Box mt={3}>
          <Box sx={{ float: 'left' }}>
            <Typography>Minhas Mentorias</Typography>
          </Box>
          <Box sx={{ float: 'right' }}>
            <CreateAreaButton
              variant="outlined"
              onClick={() => setOpenCreatePage(true)}
            >
              <PlusSvg fill={theme.palette.accent.main} />
              Criar Mentoria
            </CreateAreaButton>
            <DeleteAreaButton
              className="delete-icon"
              onClick={(e) => {
                setOpen(true);
                // e.stopPropagation();
                // handleDeleteProduct(area.id);
              }}
            >
              Excluir Mentoria
            </DeleteAreaButton>
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
                () => {
                  router.push(MentorRoutes.members_area_editar + '/' + area.id);
                }
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
        onSave={() => {
          setOpen(false);
          setShowConfirmDelete(false);
        }}
        open={open}
        setOpen={setOpen}
        title="Remover Mentoria"
        deleteMessage={true}
      >
        {showConfirmDelete ? (
          <Box sx={{ textAlign: 'center' }}>
            <DeleteText>
              Ao remover, você perderá todos os dados relacionados a essa
              mentoria. Deseja continuar mesmo assim?
            </DeleteText>
          </Box>
        ) : (
          <Box>
            <DeleteText>Escolha qual produto deseja excluir</DeleteText>
            <ProductsSelectField
              required
              sx={{ width: '100%', margin: '1rem 0' }}
            >
              <InputLabel shrink={true}>Produtos</InputLabel>
              <Select
                placeholder="Área de Membros Mentrofy"
                label="Produtos"
                color="secondary"
                notched={true}
              >
                {products.map((product) => (
                  <MenuItem
                    key={product.id}
                    value={product.id}
                    onClick={() => setProductId(product.id)}
                  >
                    {product.title}
                  </MenuItem>
                ))}
              </Select>
            </ProductsSelectField>
          </Box>
        )}
      </ModalComponent>
    </>
  );
};

// * ServerSideRender (SSR)
export const getProps = async (ctx) => {
  const { session } = await GetAuthSession(ctx);

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const { profile, user } = await GetProfile(ctx.req);
  return {
    props: {
      profile,
      user,
      initialSession: session,
    },
  };
};

export default MembersArea;
