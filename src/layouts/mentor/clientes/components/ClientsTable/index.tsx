import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { Column, DatagridProps } from '~/components/atoms/Datagrid';

import { ProductBox, ProductWrapper, Qty } from './style';

const Datagrid = dynamic<DatagridProps<any>>(
  () => import('~/components/atoms/Datagrid'),
  {
    ssr: false,
  },
);
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
    label: 'PRODUTOS',
  },
  {
    id: 'state',
    label: 'STATUS',
  },
  {
    id: 'date',
    label: 'ÚLTIMA COMPRA',
  },
  {
    id: 'actions',
    label: '',
  },
];

interface Data {
  id: string;
  name: string;
  email: string;
  product: JSX.Element;
  date: JSX.Element;
  state: JSX.Element;
  actions: JSX.Element;
}

const ClientsTable = ({
  rows = [],
  clickSeeMore,
  clickRemove,
  onClientSelected,
  actions,
}: {
  rows: UserClient.ClientRelation[];
  clickSeeMore: any;
  clickRemove: any;
  onClientSelected: any;
  actions: (id) => JSX.Element;
}) => {
  const [page, setPage] = useState(1);

  const createData = useCallback(
    (
      id: string,
      name: string,
      email: string,
      product: string,
      qty: number,
      date: string,
      state: string,
      actions: JSX.Element,
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
        actions,
      };
    },
    [],
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
      onSelectedRow={onClientSelected}
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
          actions(row.id),
        );
      })}
      onPageChange={setPage}
    />
  );
};

export default ClientsTable;
function handleClick(arg0: any, arg1: { id: any }): void {
  throw new Error('Function not implemented.');
}
