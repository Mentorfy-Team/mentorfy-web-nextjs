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
import RatioSize from '~/helpers/RatioSize';

const MembersArea: FC<PageTypes.Props> = ({ user }) => {
  const { products, mutate } = useProducts(user.id);
  const router = useRouter();
  const theme = useTheme();
  const [openCreatePage, setOpenCreatePage] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [productId, setProductId] = useState('');
  const [open, setOpen] = useState(false);

  const confirmDeleteProduct = async () => {
    if (!showConfirmDelete) {
      setShowConfirmDelete(true);
    } else {
      const res = await fetch(`/api/products?id=${productId}`, {
        method: 'DELETE',
      });
      if (res.status === 200) {
        toast.success('Alterações salvas com sucesso.');
      } else if (res.status === 400) {
        toast.error(
          'Não foi possível remover a mentoria, ainda há clientes vinculados.',
          {
            autoClose: 20000,
          },
        );
      } else {
        toast.error(
          'Houve um problema na remoção, contacte o suporte para mais informações.',
          {
            autoClose: 10000,
          },
        );
      }
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
          {products.length === 0 && (
            <Box
              sx={{
                color: '#d2d2d222',
              }}
            >
              * Você ainda não criou uma mentoria.
            </Box>
          )}
          {products?.map((area, index) => (
            <AreaWrapper
              onClick={
                async () => {
                  await router.prefetch(
                    MentorRoutes.members_area_editar + '/' + area.id,
                  );
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
                  width={RatioSize('w', 3)}
                  height={RatioSize('h', 3)}
                />
              )}
              {!area.main_image && (
                <Box
                  sx={{
                    // gradiente azul e laranja
                    background:
                      'linear-gradient(180deg, #464646 0%, #161616 100%)',
                  }}
                  width={RatioSize('w', 3)}
                  height={RatioSize('h', 3)}
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
        <EmptyBox
          sx={{
            backgroundColor: '#36353a50',
            width: RatioSize('w', 3),
            height: RatioSize('h', 3),
          }}
        >
          <ImageButton>Em breve</ImageButton>
        </EmptyBox>
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
          <Box sx={{ width: '100%' }}>
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

  return {
    props: {
      user: session.user,
    },
  };
};

export default MembersArea;
