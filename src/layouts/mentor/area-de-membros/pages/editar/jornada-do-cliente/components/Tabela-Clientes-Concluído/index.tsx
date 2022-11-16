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
  selectedTask = [],
}: {
  clients: ProductTypes.Client[],
  selectedTask: any[],
}) => {
  const createData = [];
  return (
    <Datagrid
      columns={columns}
      completedClient={clients}
      selectedTask={selectedTask}
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
