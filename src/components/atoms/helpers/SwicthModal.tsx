import dynamic from 'next/dynamic';
import { LoadingComponent } from '~/components/partials/loading/loading.partial';

const QuestionsForm = dynamic(() => import('../components/QuestionsFormModal'), {
    loading: () => <LoadingComponent />,
  });

const Checklist = dynamic(() => import('../components/ChecklistModal'), {
    loading: () => <LoadingComponent />,
  });

export type ToolsModalProps = {
    open: boolean;
    type: number;
    completedClient?: any[],
    selectedTask?: any[],
    finishedDate?: string,
    clientInputs?: any[],
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
    completedClient,
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
                    completedClient={completedClient}
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
                    completedClient={completedClient}
                    selectedTask={selectedTask}
                    finishedDate={finishedDate}
                    clientInputs={clientInputs}
                />
            );
    //     case ToolListNames.WheelOfLifeModal.name:
    //         return (
    //             <WheelOfLifeModal
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
    //     case ToolListNames.Embed.name:
    //         return (
    //             <Embed
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
    //     case ToolListNames.UploadFile.name:
    //         return (
    //             <UploadFile
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
    //     case ToolListNames.OpenText.name:
    //         return (
    //             <OpenText
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
    //     case ToolListNames.Video.name:
    //         return (
    //             <Video
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
    //     default:
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
     }
};

export default SwicthClientJouneyModal;
