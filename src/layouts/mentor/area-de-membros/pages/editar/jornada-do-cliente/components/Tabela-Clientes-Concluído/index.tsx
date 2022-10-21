import dynamic from 'next/dynamic';
import { Column } from '~/components/atoms/Datagrid';

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
      label: 'ÁREA DE MEMBROS',
    },
    {
      id: 'date',
      label: 'CONCLUÍDO',
    },
  ];

  interface Data {
    name: string;
    email: string;
    product: JSX.Element;
    date: JSX.Element;
  }

const CompletedClientsTable = () => {

    const createData = [];
    return (
        <Datagrid
        columns={columns}
        rows={createData}
        page={1}
        />
    );
};

export default CompletedClientsTable;
