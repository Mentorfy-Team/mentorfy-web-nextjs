import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Column } from '~/components/atoms/Datagrid';
import { ProductBox } from './style';

const Datagrid = dynamic(() => import('~/components/atoms/Datagrid'), {
  ssr: false,
});

const ProductsTable = () => {
  const [page, setPage] = useState(1);
  const columns: Column[] = [
    {
      id: 'name',
      label: 'Nome',
    },
    {
      id: 'e-mail',
      label: 'E-mail',
    },
    {
      id: 'produto',
      label: 'Produto',
    },
    {
      id: 'purchase-date',
      label: 'Data da Compra',
    },
  ];

  interface Data {
    name: string;
    email: string;
    produto?: JSX.Element;
    date: string;
  }

  function createData(
    name: string,
    email: string,
    produto: string,
    date: string,
  ): Data {
    return {
      name,
      email,
      produto: <ProductBox>{produto}</ProductBox>,
      date,
    };
  }

  const rows = [
    createData(
      'Alexandre Mendes',
      'alexandre.mendes@gmail.com',
      'Cerca de 8 horas',
      '',
    ),
    createData(
      'Alexandre Mendes',
      'alexandre.mendes@gmail.com',
      'Cerca de 8 horas',
      '',
    ),
    createData(
      'Alexandre Mendes',
      'alexandre.mendes@gmail.com',
      'Cerca de 8 horas',
      '',
    ),
    createData(
      'Alexandre Mendes',
      'alexandre.mendes@gmail.com',
      'Cerca de 8 horas',
      '',
    ),
    createData(
      'Alexandre Mendes',
      'alexandre.mendes@gmail.com',
      'Cerca de 8 horas',
      '',
    ),
    createData(
      'Alexandre Mendes',
      'alexandre.mendes@gmail.com',
      'Cerca de 8 horas',
      '',
    ),
  ];
  return <Datagrid page={page} columns={columns} rows={rows} />;
};

export default ProductsTable;
