import { useCallback, useState } from 'react';
import RemoveIcon from '@mui/icons-material/Block';
import FindInPage from '@mui/icons-material/FindInPage';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { Column } from '~/components/atoms/Datagrid';
import {
  MarginPopopver,
  OptionsButton,
  PopoverBox,
} from '~/layouts/mentor/area-de-membros/components/MembersAreaTable/styles';
import {
  ProductBox,
  ProductWrapper,
  Qty,
  RemoveButton,
  SeeMoreButton,
} from './style';
import DotsSvg from '~/../public/svgs/dots';

const Datagrid = dynamic(() => import('~/components/atoms/Datagrid'), {
  ssr: false,
});
const columns: Column[] = [
  {
    id: 'name',
    label: 'NOME',
  },
  {
    id: 'email',
    label: 'E-MAIL',
  },
  {
    id: 'product',
    label: 'ACESSO AO PRODUTO',
  },
  {
    id: 'actions',
    label: '',
  },
];

interface Data {
  name: string;
  email: string;
  product: JSX.Element;
  date: JSX.Element;
  state: JSX.Element;
  actions: JSX.Element;
  id: string;
}

const ApprovalsTable = ({
  rows = [],
  clickSeeMore,
  clickRemove,
}: {
  rows: UserClient.ClientRelation[];
  clickSeeMore: any;
  clickRemove: any;
}) => {
  const [page, setPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, row: { id: string }) => {
      setAnchorEl(event.currentTarget);
      setSelectedRow(row);
    },
    [],
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const createData = useCallback(
    (
      id: string,
      name: string,
      email: string,
      product: string,
      qty: number,
      date: string,
      state: string,
      onSeeMore: (id) => void,
      onRemove: (id) => void,
    ): Data => {
      return {
        id,
        name,
        email,
        product: (
          <ProductWrapper>
            <ProductBox>
              <p>{product}</p>
            </ProductBox>
            {qty > 1 ? <Qty>+{qty - 1}</Qty> : ''}
          </ProductWrapper>
        ),
        state: <div>{state}</div>,
        date: (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography>
                {new Date(date).toLocaleString('pt-BR', {
                  day: 'numeric',
                  weekday: 'long',
                  month: 'short',
                  year: 'numeric',
                })}
              </Typography>
            </Box>
          </Box>
        ),
        actions: (
          <div key={`settings-${id}`} style={{ padding: '0px' }}>
            <MarginPopopver
              sx={{ width: 35, height: 32 }}
              onClick={(e) => handleClick(e as any, { id })}
            >
              <OptionsButton>
                <SvgIcon color="info" component={DotsSvg} />
              </OptionsButton>
            </MarginPopopver>
            <Popover
              id={'popover-' + selectedRow.id}
              open={open}
              onClose={handleClose}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'right',
              }}
              transitionDuration={1}
            >
              <PopoverBox display="flex" flexDirection="column">
                <Box
                  sx={{
                    backgroundColor: 'primary.dark',
                  }}
                  p={0.5}
                  pl={1}
                  pr={1}
                  onClick={() => onSeeMore(id)}
                >
                  <SeeMoreButton>
                    <SvgIcon
                      sx={{ marginRight: '0.5rem', width: '100%' }}
                      component={FindInPage}
                    />
                    <Box width="100%">Visualizar Perfil</Box>
                  </SeeMoreButton>
                </Box>
                <Divider />
                <Box
                  sx={{
                    backgroundColor: 'primary.dark',
                  }}
                  p={0.5}
                  pl={1}
                  pr={1}
                  onClick={() => onRemove(id)}
                >
                  <RemoveButton>
                    <SvgIcon
                      sx={{ marginRight: '0.5rem', width: '100%' }}
                      component={RemoveIcon}
                    />
                    <Box width="100%">Remover Cliente</Box>
                  </RemoveButton>
                </Box>
              </PopoverBox>
            </Popover>
          </div>
        ),
      };
    },
    [anchorEl, handleClick, open, selectedRow.id],
  );

  const getMaxSubscribedAtDate = (array) => {
    const dates = array.map((item) => new Date(item.subscribed_at));

    return new Date(Math.max.apply(null, dates));
  };

  const findLastProduct = (array) => {
    const maxDate = getMaxSubscribedAtDate(array);
    const lastProduct = array.find((item) => {
      return new Date(item.subscribed_at).toString() === maxDate.toString();
    });
    return lastProduct;
  };

  return (
    <Datagrid
      page={page}
      columns={columns}
      rows={rows.map((row) => {
        const lastProduct = findLastProduct(row.products);
        return createData(
          row.id,
          row.name,
          row.email,
          lastProduct.title,
          row.products.length,
          lastProduct.subscribed_at,
          'Ativo',
          clickSeeMore,
          clickRemove,
        );
      })}
      onPageChange={setPage}
    />
  );
};

export default ApprovalsTable;
