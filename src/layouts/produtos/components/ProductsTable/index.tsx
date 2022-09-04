import { useState } from 'react';
import { Edit, Link } from '@mui/icons-material';
import {
  Box,
  Button,
  Popover,
  SvgIcon,
  TableCell,
  Typography,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Column } from '~/components/atoms/Datagrid';
import { Routes } from '~/consts';
import {
  EnterMemberArea,
  MarginPopopver,
  OptionsButton,
  PopoverBox,
} from './styles';
import { door_svg, dots_svg } from '~/../public/svgs';

const Datagrid = dynamic(() => import('~/components/atoms/Datagrid'), {
  ssr: false,
});

const columns: Column[] = [
  { id: 'name', label: 'NOME', minWidth: 140 },
  {
    id: 'price',
    label: 'PREÇO',
    format: (value) =>
      value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  },
  {
    id: 'users',
    label: 'MENTORADOS',
  },
  {
    id: 'memberArea',
    label: 'Área de Membros',
  },
  {
    id: 'status',
    label: 'STATUS',
  },
];

interface Data {
  name: string;
  price: number;
  users: number;
  memberArea?: JSX.Element;
  status: JSX.Element;
}

const ProductsTable = () => {
  const [page, setPage] = useState(1);
  const route = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  function createData(
    name: string,
    price: number,
    users: number,
    status: string,
    memberArea?: number,
  ): Data {
    return {
      name,
      price,
      users,
      memberArea: memberArea ? (
        <EnterMemberArea
          onClick={() => route.push(Routes.member_area + '/1')}
          display="flex"
        >
          <SvgIcon sx={{ paddingTop: '3px' }} component={door_svg} />
          Entrar
        </EnterMemberArea>
      ) : null,
      status: (
        <Box
          sx={{
            backgroundColor: status === 'Ativo' ? '#86ffb9' : '#ff98ac',
            color: status === 'Ativo' ? '#075327' : '#6b1728',
            fontWeight: 'bold',
            width: 60,
            textAlign: 'center',
            borderRadius: 10,
          }}
        >
          <Typography variant="body2">{status}</Typography>
        </Box>
      ),
    };
  }

  const rows = [
    createData('Mentoria S1', 597.0, 159, 'Ativo', 1),
    createData('Mentoria S2', 597.0, 159, 'Ativo'),
    createData('Mentoria S3', 597.0, 159, 'Ativo'),
    createData('Mentoria S4', 597.0, 159, 'Ativo'),
    createData('Mentoria S5', 597.0, 159, 'Ativo'),
    createData('Mentoria S6', 597.0, 159, 'Ativo'),
    createData('Mentoria S7', 597.0, 159, 'Ativo'),
    createData('Mentoria S8', 597.0, 159, 'Ativo'),
    createData('Mentoria S9', 597.0, 159, 'Ativo'),
    createData('Mentoria S10', 597.0, 159, 'Ativo'),
    createData('Mentoria S11', 597.0, 159, 'Ativo'),
    createData('Mentoria S12', 597.0, 159, 'Ativo'),
    createData('Mentoria S13', 597.0, 159, 'Ativo'),
    createData('Mentoria S14', 597.0, 159, 'Ativo'),
    createData('Mentoria S15', 597.0, 159, 'Ativo'),
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (id = 'hud2-ioqdf-002e-eee7') => {
    route.push(Routes.products_edit + '/' + id);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Datagrid
      page={page}
      onPageChange={setPage}
      columns={columns}
      rows={rows}
      onTitleClick={(id) => handleEdit(id)}
      actionButtons={(index) => [
        <TableCell
          key={`settings-${index}`}
          align="left"
          style={{ minWidth: 100, padding: '0px' }}
        >
          <MarginPopopver
            sx={{ width: 35, height: 32 }}
            onClick={(e) => handleClick(e as any)}
          >
            <OptionsButton>
              <SvgIcon color="info" component={dots_svg} />
            </OptionsButton>
          </MarginPopopver>
          <Popover
            id={'simple-popover-' + index}
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
              <Button>
                <SvgIcon sx={{ marginRight: '0.5rem' }} component={Link} /> Ver
                Links
              </Button>
              <Button onClick={() => handleEdit()}>
                <SvgIcon sx={{ marginRight: '0.5rem' }} component={Edit} />{' '}
                Editar
              </Button>
            </PopoverBox>
          </Popover>
        </TableCell>,
      ]}
    />
  );
};

export default ProductsTable;
