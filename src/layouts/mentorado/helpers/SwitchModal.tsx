import React from 'react';
import dynamic from 'next/dynamic';
import { LoadingComponent } from '~/components/partials/loading/loading.partial';
import WheelOfLifeModal from '../components/wheel-of-Life';

const Checklist = dynamic(() => import('../components/checklist-modal'), {
  loading: () => <LoadingComponent />,
});
const Embed = dynamic(() => import('../components/embed'), {
  loading: () => <LoadingComponent />,
  ssr: false,
});
const OpenText = dynamic(() => import('../components/open-text'), {
  loading: () => <LoadingComponent />,
});
const QuestionsForm = dynamic(() => import('../components/questions-forms'), {
  loading: () => <LoadingComponent />,
});
const DownloadFileModal = dynamic(() => import('../components/file-download'), {
  loading: () => <LoadingComponent />,
});
const UploadFileModal = dynamic(() => import('../components/upload-file'), {
  loading: () => <LoadingComponent />,
});
// const WheelOfLifeModal = dynamic(
//   () => import('../components/'),
//   {
//     loading: () => <LoadingComponent />,
//   },
// );
const Video = dynamic(() => import('../components/video-modal'), {
  loading: () => <LoadingComponent />,
});
const Schedule = dynamic(() => import('../components/schedule'), {
  loading: () => <LoadingComponent />,
});

export const ToolListNames = {
  StepGroup: { name: 'Módulo de Etapas', id: 0 },
  QuestionsForm: { name: 'Formulário de Perguntas', id: 1 },
  DownloadFile: { name: 'Download de Arquivo', id: 2 },
  Checklist: { name: 'Checklist', id: 3 },
  Video: { name: 'Upload de Vídeo', id: 4 },
  Embed: { name: 'Embed', id: 5 },
  OpenText: { name: 'Campo de Texto Aberto', id: 6 },
  WheelOfLifeModal: { name: 'Roda da Vida', id: 7 },
  Calendar: { name: 'Calendário', id: 8 },
  UploadFile: { name: 'Upload de Arquivo', id: 9 },
  ToolList: { name: 'Lista de Ferramentas', id: 10 },
};

export type ToolsModalProps = {
  open: boolean;
  type?: string;
  refId?: string;
  area_id?: string;
  data: any;
  userInput: MemberAreaTypes.UserInput;
  onChange?: (value: any) => any;
  setOpen?: (value: any) => any;
};

const SwitchMentoredModal: React.FC<ToolsModalProps> = ({
  onChange,
  data,
  type = ToolListNames.ToolList.name,
  open,
  setOpen,
  refId,
  userInput,
}) => {
  switch (type) {
    case ToolListNames.WheelOfLifeModal.name:
      return (
        <WheelOfLifeModal
          data={data}
          userInput={userInput}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              ...props,
              refId,
            })
          }
        />
      );
    case ToolListNames.Checklist.name:
      return (
        <Checklist
          data={data}
          userInput={userInput}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              ...props,
              refId,
            })
          }
        />
      );
    case ToolListNames.Embed.name:
      return (
        <Embed
          data={data}
          userInput={userInput}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              ...props,
              refId,
            })
          }
        />
      );
    case ToolListNames.DownloadFile.name:
      return (
        <DownloadFileModal
          data={data}
          userInput={userInput}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              ...props,
              refId,
            })
          }
        />
      );
    case ToolListNames.OpenText.name:
      return (
        <OpenText
          data={data}
          userInput={userInput}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              ...props,
              refId,
            })
          }
        />
      );
    case ToolListNames.QuestionsForm.name:
      return (
        <QuestionsForm
          data={data}
          userInput={userInput}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              ...props,
              refId,
            })
          }
        />
      );
    case ToolListNames.Video.name:
      return (
        <Video
          data={data}
          userInput={userInput}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              ...props,
              refId,
            })
          }
        />
      );
    case ToolListNames.UploadFile.name:
      return (
        <UploadFileModal
          data={data}
          userInput={userInput}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              ...props,
              refId,
            })
          }
        />
      );
    case ToolListNames.StepGroup.name:
      return (
        <OpenText
          data={data}
          userInput={userInput}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              ...props,
              refId,
            })
          }
        />
      );
    case ToolListNames.Calendar.name:
      return (
        <Schedule
          data={data}
          userInput={userInput}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              ...props,
              refId,
            })
          }
        />
      );
    default:
      return (
        <Schedule
          data={data}
          userInput={userInput}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              ...props,
              refId,
            })
          }
        />
      );
  }
};

export default SwitchMentoredModal;
