import { useCallback, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Column } from '~/components/atoms/Datagrid';
import { MentorRoutes } from '~/consts';
import {
  EnterMemberArea,
  MarginPopopver,
  OptionsButton,
  PopoverBox,
  Text,
} from './styles';
import DoorSvg from '~/../public/svgs/door';
import DotsSvg from '~/../public/svgs/dots';

const Datagrid = dynamic(() => import('~/components/atoms/Datagrid'), {
  ssr: false,
});

const columns: Column[] = [
  { id: 'title', label: 'NOME', minWidth: 140 },
  {
    id: 'price',
    label: 'PREÇO',
    format: (value) =>
      value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  },
  {
    id: 'memberArea',
    label: 'Área de Membros',
  },
  {
    id: 'status',
    label: 'STATUS',
  },
  {
    id: 'actions',
    label: '',
  },
];

interface Data {
  title: string;
  price: number;
  memberArea?: JSX.Element;
  status: JSX.Element;
  actions: any;
  id: string;
}

const ProductsTable = ({ rows }: { rows: ProductClient.Product[] }) => {
  const [page, setPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const route = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createData = useCallback(
    ({
      title,
      price,
      deliver,
      access_link,
      status,
      id,
    }: ProductClient.Product): Data => {
      const link = access_link ? access_link : MentorRoutes.products_edit + '/' + id;
      return {
        title,
        price,
        memberArea:
          deliver !== 'signup' ? (
            <EnterMemberArea
              onClick={() =>
                route.push(link)
              }
              display="flex"
            >
              <Box>
                <DoorSvg />
              </Box>
              <Typography pl={2} fontSize="0.959rem" lineHeight="1.15rem">
                Entrar
              </Typography>
            </EnterMemberArea>
          ) : null,
        status: (
          <Box
            sx={{
              backgroundColor: status ? '#86ffb9' : '#ff98ac',
              color: status ? '#075327' : '#6b1728',
              fontWeight: 'bold',
              width: 60,
              textAlign: 'center',
              borderRadius: 10,
            }}
          >
            <Typography variant="body2">
              {status ? 'Ativo' : 'Desativado'}
            </Typography>
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
                <Link
                  href={
                    MentorRoutes.products_edit +
                    '/' +
                    selectedRow.id +
                    '?tab=Links'
                  }
                  passHref
                >
                  <Button>
                    <SvgIcon
                      sx={{ marginRight: '0.5rem', width: '1.2rem' }}
                      component={LinkIcon}
                    />
                    <Text width="100%">Ver Links</Text>
                  </Button>
                </Link>
                <Link
                  href={MentorRoutes.products_edit + '/' + selectedRow.id}
                  passHref
                >
                  <Button>
                    <SvgIcon
                      sx={{ marginRight: '0.5rem', width: '1.2rem' }}
                      component={EditIcon}
                    />
                    <Text width="100%">Editar</Text>
                  </Button>
                </Link>
              </PopoverBox>
            </Popover>
          </div>
        ),
        id,
      };
    },
    [anchorEl, open, route, selectedRow],
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (id) => {
    route.push(MentorRoutes.products_edit + '/' + id);
  };
  return (
    <Datagrid
      page={page}
      onPageChange={setPage}
      columns={columns}
      rows={rows?.map((row) => createData(row))}
      onTitleClick={(id) => handleEdit(id)}
    />
  );
};

export default ProductsTable;
