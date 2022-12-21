import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { Column, DatagridProps } from '~/components/atoms/Datagrid';

import { ProductBox, ProductWrapper, Qty } from './style';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
    id: 'products',
    label: 'PRODUTOS',
  },
  {
    id: 'date',
    label: 'DESDE',
    minWidth: 170,
  },
];

interface Data {
  name: string;
  products: JSX.Element;
  date: JSX.Element;
}

const MentorClientsTable = ({
  rows = [],
  clickSeeMore,
  clickRemove,
  onClientSelected,
  actions,
}: {
  rows: ClientTypes.Client[];
  clickSeeMore?: any;
  clickRemove?: any;
  onClientSelected?: any;
  actions?: (id) => JSX.Element;
}) => {
  const [page, setPage] = useState(1);

  const createData = useCallback(
    (name: string, products: string, date: number, qty: number): Data => {
      return {
        name,
        products: (
          <ProductWrapper>
            <ProductBox>
              <p>{products}</p>
            </ProductBox>
            {qty > 1 ? <Qty>+{qty - 1}</Qty> : ''}
          </ProductWrapper>
        ),
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
      clickable={false}
      columns={columns}
      onSelectedRow={onClientSelected}
      rows={rows.map((row) => {
        const lastProduct = findLastProduct(row.products);
        return createData(
          row.name,
          row.products.map((product) => product.title).join(', '),
          Date.now(),
          row.products?.length,
        );
      })}
      sx={{
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0)',
      }}
      onPageChange={setPage}
    />
  );
};

export default MentorClientsTable;
function handleClick(arg0: any, arg1: { id: any }): void {
  throw new Error('Function not implemented.');
}
