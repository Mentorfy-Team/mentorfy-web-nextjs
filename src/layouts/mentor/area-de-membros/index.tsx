import { FC, useEffect, useState } from 'react';
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
  AreaWrapper,
  CopyButton,
  CreateAreaButton,
  DefaultAreaWrapper,
  DefaultProductsWrapper,
  DeleteAreaButton,
  ProductTitle,
  ProductsField,
  ProductsSelectField,
} from './styles';
import PlusSvg from '~/../public/svgs/plus';
import { GetAuthSession } from '~/helpers/AuthSession';
import RatioSize from '~/helpers/RatioSize';
import { CloneProduct } from '~/services/clone-product.service';
import isReadOnly from '~/helpers/IsReadOnly';
import { CheckForSubscription } from '~/backend/repositories/subscription/CheckForSubscription';
import { SupabaseServer } from '~/backend/supabase';
import defaultUser from '~/consts/defaultUser';

const MembersArea: FC<PageTypes.Props> = ({ user, readonly }) => {
  const { products, mutate } = useProducts(user.id);
  const { products: defaultProducts } = useProducts(defaultUser);
  const router = useRouter();
  const theme = useTheme();
  const [openCreatePage, setOpenCreatePage] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showCloneProduct, setShowCloneProduct] = useState(false);
  const [productId, setProductId] = useState('');
  const [defaultProductTitle, setDefaultProductTitle] = useState('');
  const [defaultProductType, setDefaultProductType] = useState('');
  const [cloneProduct, setCloneProduct] = useState({});
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
  const handleDefaultProducts = (area) => {
    setShowCloneProduct(!showCloneProduct);
    setDefaultProductType(area?.title);
    setCloneProduct((state) => ({
      ...state,
      product_id: area.id,
    }));
  };

  useEffect(() => {
    if (showCloneProduct) {
      setCloneProduct((state) => ({
        ...state,
        title: defaultProductTitle,
      }));
    }
  }, [defaultProductTitle, showCloneProduct]);

  const SubmitCloneProduct = async () => {
    const newProduct = await CloneProduct(cloneProduct);

    await router.prefetch(
      MentorRoutes.members_area + '/editar/' + newProduct.id,
    );
    router.push(MentorRoutes.members_area + '/editar/' + newProduct.id);
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
              disabled={readonly}
              onClick={() => setOpenCreatePage(true)}
            >
              <PlusSvg fill={theme.palette.accent.main} />
              Criar Mentoria
            </CreateAreaButton>
            <DeleteAreaButton
              className="delete-icon"
              disabled={readonly}
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
              {area.owner != user.id && (
                <Box
                  sx={(theme) => ({
                    position: 'absolute',
                    width: '100%',
                    height: '8%',
                    backgroundColor: theme.palette.accent.main,
                    borderRadius: '8px 8px 0 0',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  })}
                >
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    mt={0.5}
                    sx={{ color: '#fff' }}
                  >
                    Acesso de Time
                  </Typography>
                </Box>
              )}
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
                    border: `1px solid ${theme.palette.accent.dark}`,
                    borderRadius: '10px',
                  }}
                >
                  <Image
                    alt=""
                    src={area.member_area?.member_area_type.image}
                    style={{
                      objectFit: 'cover',
                      borderRadius: '0.5rem',
                    }}
                    width={RatioSize('w', 3)}
                    height={RatioSize('h', 3)}
                  />
                </Box>
              )}

              {!area?.banner_image && (
                <AbsoluteBottomBox>
                  <ProductTitle>{area?.title}</ProductTitle>
                </AbsoluteBottomBox>
              )}
            </AreaWrapper>
          ))}
        </Box>
        <Divider sx={{ borderColor: '#36353A', m: '2rem 0rem' }} />
        <Box sx={{ display: 'flex', mb: '1.5rem', gap: '1rem' }}>
          <Typography>Modelos Prontos</Typography>
          <Typography color="caption.main">
            (Clique em Usar Modelo para selecionar o modelo)
          </Typography>
        </Box>
        <DefaultProductsWrapper>
          {defaultProducts?.map((area, index) => (
            <DefaultAreaWrapper key={index}>
              <CopyButton
                disabled={readonly}
                onClick={() => handleDefaultProducts(area)}
              >
                Usar Modelo
              </CopyButton>
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
                    border: `1px solid ${theme.palette.accent.dark}`,
                    borderRadius: '10px',
                  }}
                >
                  <Image
                    alt=""
                    src={area.member_area?.member_area_type.image}
                    style={{
                      objectFit: 'cover',
                      borderRadius: '0.5rem',
                    }}
                    width={RatioSize('w', 3)}
                    height={RatioSize('h', 3)}
                  />
                </Box>
              )}

              {!area?.banner_image && (
                <AbsoluteBottomBox>
                  <ProductTitle>{area?.title}</ProductTitle>
                </AbsoluteBottomBox>
              )}
            </DefaultAreaWrapper>
          ))}
        </DefaultProductsWrapper>
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
      {/* Clone Product Modal */}
      <ModalComponent
        onSave={() => SubmitCloneProduct()}
        open={showCloneProduct}
        setOpen={setShowCloneProduct}
        title="Usar Modelo Pronto"
        sx={{ width: '500px' }}
      >
        <Box sx={{ width: '100%' }}>
          <DeleteText>Configure o seu modelo</DeleteText>
          <ProductsField
            label="Nome da Mentoria"
            required
            color="secondary"
            sx={{ width: '100%', margin: '1rem 0' }}
            onChange={(e) => setDefaultProductTitle(e.target.value)}
          />
          <ProductsField
            label="Tipo"
            color="secondary"
            defaultValue={defaultProductType}
            sx={{ width: '100%', margin: '1rem 0' }}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
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

  const supabase = SupabaseServer(ctx.req, ctx.res);
  const accesses = await CheckForSubscription({
    supabase,
    data: {
      user_id: session.user.id,
    },
  });

  const readOnly = isReadOnly(accesses);

  return {
    props: {
      user: session.user,
      readOnly,
    },
  };
};

export default MembersArea;
