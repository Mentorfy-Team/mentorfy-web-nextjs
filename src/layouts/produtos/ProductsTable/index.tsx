import { useState } from 'react';
import { Box, Button, SvgIcon, TableCell, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { Column } from '~/components/atoms/Datagrid';
import { gear_svg } from '~/../public/svgs';

const Datagrid = dynamic(() => import('~/components/atoms/Datagrid'), {
  ssr: false,
});

const columns: Column[] = [
  { id: 'name', label: 'NOME', minWidth: 120 },
  {
    id: 'price',
    label: 'PREÇO',
    minWidth: 0,
    format: (value) =>
      value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  },
  {
    id: 'users',
    label: 'MENTORADOS',
    minWidth: 0,
  },
  {
    id: 'status',
    label: 'STATUS',
    minWidth: 0,
  },
];

interface Data {
  name: string;
  price: number;
  users: number;
  status: JSX.Element;
}

function createData(
  name: string,
  price: number,
  users: number,
  status: string,
): Data {
  return {
    name,
    price,
    users,
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
  createData('Mentoria S1', 597.0, 159, 'Ativo'),
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

const ProductsTable = () => {
  const [page, setPage] = useState(1);

  return (
    <Datagrid
      page={page}
      onPageChange={setPage}
      columns={columns}
      rows={rows}
      actionButtons={[
        <TableCell key="settings" align="left" style={{ minWidth: 100 }}>
          <Button sx={{ height: 18 }}>
            <SvgIcon component={gear_svg} />
          </Button>
        </TableCell>,
      ]}
    />
  );
};

export default ProductsTable;
