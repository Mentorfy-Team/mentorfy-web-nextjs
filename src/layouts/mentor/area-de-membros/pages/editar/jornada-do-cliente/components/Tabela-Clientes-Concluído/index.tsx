import dynamic from 'next/dynamic';
import { Column, DatagridProps } from '~/components/atoms/Datagrid';

type JorneyTableProps = {
  id: string;
  name: string;
  email: string;
  since: JSX.Element;
  progress: JSX.Element;
};

const Datagrid = dynamic<DatagridProps<JorneyTableProps>>(
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
    id: 'since',
    label: 'MEMBRO DESDE',
  },
  {
    id: 'progress',
    label: 'PROGRESSO',
  },
];

interface Data {
  name: string;
  email: string;
  product: JSX.Element;
  date: JSX.Element;
}

const CompletedClientsTable = ({
  clients = [],
  onSelectedClient,
}: {
  clients: ProductTypes.Client[];
  onSelectedClient: (client: ProductTypes.Client) => void;
}) => {
  return (
    <Datagrid
      columns={columns}
      onSelectedRow={(row) =>
        onSelectedClient(clients.find((c) => c.id === row.id))
      }
      rows={clients.map((client) => {
        return {
          id: client.id,
          name: client.name,
          email: client.email,
          since: (
            <span>
              {
                // to human readable date
                new Date(client.since).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              }
            </span>
          ),
          progress: <span>{client.progress || 0}%</span>,
        };
      })}
      page={1}
    />
  );
};

export default CompletedClientsTable;
