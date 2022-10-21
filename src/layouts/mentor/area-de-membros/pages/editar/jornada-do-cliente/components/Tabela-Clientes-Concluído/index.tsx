import dynamic from 'next/dynamic';

const Datagrid = dynamic(() => import('~/components/atoms/Datagrid'), {
    ssr: false,
  });
const CompletedClientsTable = () => {
    return (
        <Datagrid/>
    );
};

export default CompletedClientsTable;
