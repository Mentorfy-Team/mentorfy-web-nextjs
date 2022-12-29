import dynamic from 'next/dynamic';
import { LoadingComponent } from '@app/components/partials/loading/loading.partial';

const QuestionsForm = dynamic(
  () => import('../components/QuestionsFormModal'),
  {
    loading: () => <LoadingComponent />,
  },
);

const Checklist = dynamic(() => import('../components/ChecklistModal'), {
  loading: () => <LoadingComponent />,
});

const WheelOfLifeModal = dynamic(
  () => import('../components/WheelOfLifeModal'),
  {
    loading: () => <LoadingComponent />,
  },
);

const VideoModal = dynamic(() => import('../components/VideoModal'), {
  loading: () => <LoadingComponent />,
});

const DefaultModal = dynamic(() => import('../components/DefaultModal'), {
  loading: () => <LoadingComponent />,
});

export type ToolsModalProps = {
  open: boolean;
  type: number;
  selectedClient?: any;
  selectedTask?: any;
  finishedDate?: string;
  clientInputs?: any[];
  setOpen?: (value: any) => any;
};

export const ToolListNames = {
  QuestionsForm: { name: 'Formulário de Perguntas', id: 1 },
  UploadFile: { name: 'Upload de Arquivo', id: 2 },
  Checklist: { name: 'Checklist', id: 3 },
  Video: { name: 'Upload de Vídeo', id: 4 },
  Embed: { name: 'Embed', id: 5 },
  OpenText: { name: 'Campo de Texto Aberto', id: 6 },
  WheelOfLifeModal: { name: 'Roda da Vida', id: 7 },
  Calendar: { name: 'Calendário', id: 8 },
};

const SwicthClientJouneyModal: React.FC<ToolsModalProps> = ({
  open,
  type,
  selectedClient,
  selectedTask,
  finishedDate,
  clientInputs,
  setOpen,
}) => {
  switch (type) {
    case ToolListNames.QuestionsForm.id:
      return (
        <QuestionsForm
          open={open}
          setOpen={setOpen}
          completedClient={selectedClient}
          selectedTask={selectedTask}
          finishedDate={finishedDate}
          clientInputs={clientInputs}
        />
      );
    case ToolListNames.Checklist.id:
      return (
        <Checklist
          open={open}
          setOpen={setOpen}
          completedClient={selectedClient}
          selectedTask={selectedTask}
          finishedDate={finishedDate}
          clientInputs={clientInputs}
        />
      );
    case ToolListNames.WheelOfLifeModal.id:
      return (
        <WheelOfLifeModal
          open={open}
          setOpen={setOpen}
          completedClient={selectedClient}
          selectedTask={selectedTask}
          finishedDate={finishedDate}
          clientInputs={clientInputs}
        />
      );
    case ToolListNames.Video.id:
      return (
        <VideoModal
          open={open}
          setOpen={setOpen}
          completedClient={selectedClient}
          selectedTask={selectedTask}
          finishedDate={finishedDate}
          clientInputs={clientInputs}
        />
      );
    //     case ToolListNames.Calendar.name:
    //         return (
    //             <Schedule
    //                 data={data}
    //                 userInput={userInput}
    //                 open={open}
    //                 setOpen={setOpen}
    //                 onChange={(props) =>
    //                     onChange({
    //                         ...props,
    //                         refId,
    //                     })
    //                 }
    //             />
    //         );
    //         // From now on the tools don´t need a modal with info
    case ToolListNames.Embed.id:
      return (
        <DefaultModal
          open={open}
          setOpen={setOpen}
          completedClient={selectedClient}
          finishedDate={finishedDate}
        />
      );
    case ToolListNames.UploadFile.id:
      return (
        <DefaultModal
          open={open}
          setOpen={setOpen}
          completedClient={selectedClient}
          finishedDate={finishedDate}
        />
      );
    case ToolListNames.OpenText.id:
      return (
        <DefaultModal
          open={open}
          setOpen={setOpen}
          completedClient={selectedClient}
          finishedDate={finishedDate}
        />
      );
    default:
      return (
        <DefaultModal
          open={open}
          setOpen={setOpen}
          completedClient={selectedClient}
          finishedDate={finishedDate}
        />
      );
  }
};

export default SwicthClientJouneyModal;
