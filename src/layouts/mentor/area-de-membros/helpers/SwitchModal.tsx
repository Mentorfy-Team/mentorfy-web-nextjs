import React from 'react';
import dynamic from 'next/dynamic';
import { LoadingComponent } from '~/components/partials/loading/loading.partial';

const Checklist = dynamic(() => import('../components/ChecklistModal'), {
  loading: () => <LoadingComponent />,
});
const Embed = dynamic(() => import('../components/EmbedModal'), {
  loading: () => <LoadingComponent />,
});
const OpenText = dynamic(() => import('../components/OpenTextFieldModal'), {
  loading: () => <LoadingComponent />,
});
const QuestionsForm = dynamic(
  () => import('../components/QuestionsFormModal'),
  { loading: () => <LoadingComponent /> },
);
const DownloadFileModal = dynamic(() => import('../components/DownloadFileModal'), {
  loading: () => <LoadingComponent />,
});
const UploadFileModal = dynamic(() => import('../components/UploadFileModal'), {
  loading: () => <LoadingComponent />,
});
const WheelOfLifeModal = dynamic(
  () => import('../components/WheelOfLifeModal'),
  {
    loading: () => <LoadingComponent />,
  },
);
const Video = dynamic(() => import('../components/VideoModal'), {
  loading: () => <LoadingComponent />,
});

const GroupModal = dynamic(() => import('../components/GroupModal'), {
  loading: () => <LoadingComponent />,
});
import ToolList from '../components/ToolListModal';

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
  onChange?: (value: any) => any;
  setOpen?: (value: any) => any;
  rows?: any[];
  area_type?: number;
};

const SwitchModal: React.FC<ToolsModalProps> = ({
  onChange,
  data,
  type = ToolListNames.ToolList.name,
  open,
  setOpen,
  refId,
  area_id,
  rows,
  area_type,
}) => {
  switch (type) {
    case ToolListNames.WheelOfLifeModal.name:
      return (
        <WheelOfLifeModal
          data={data}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              data: { ...props, type: ToolListNames.WheelOfLifeModal.id },
              refId,
            })
          }
        />
      );
    case ToolListNames.Checklist.name:
      return (
        <Checklist
          data={data}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              data: { ...props, type: ToolListNames.Checklist.id },
              refId,
            })
          }
        />
      );
    case ToolListNames.Embed.name:
      return (
        <Embed
          data={data}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              data: { ...props, type: ToolListNames.Embed.id },
              refId,
            })
          }
        />
      );
    case ToolListNames.DownloadFile.name:
      return (
        <DownloadFileModal
          area_id={area_id}
          data={data}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              data: { ...props, type: ToolListNames.UploadFile.id },
              refId,
            })
          }
        />
      );
    case ToolListNames.OpenText.name:
      return (
        <OpenText
          data={data}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              data: { ...props, type: ToolListNames.OpenText.id },
              refId,
            })
          }
        />
      );
    case ToolListNames.QuestionsForm.name:
      return (
        <QuestionsForm
          data={data}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              data: { ...props, type: ToolListNames.QuestionsForm.id },
              refId,
            })
          }
        />
      );
    case ToolListNames.Video.name:
      return (
        <Video
          area_id={area_id}
          multivideos={false}
          data={data}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              data: { ...props, type: ToolListNames.Video.id },
              refId,
            })
          }
        />
      );
    case ToolListNames.UploadFile.name:
      return (
        <UploadFileModal
          data={data}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              data: { ...props, type: ToolListNames.UploadFile.id },
              refId,
            })
          }
        />
      );
    case ToolListNames.StepGroup.name:
      return (
        <GroupModal
          area_id={area_id}
          data={{ ...data, rows: rows || [] }}
          open={open}
          setOpen={setOpen}
          onChange={(props) =>
            onChange({
              data: { ...props },
              refId,
            })
          }
          area_type={area_type}
        />
      );
    case ToolListNames.ToolList.name:
      return (
        <ToolList
          open={open}
          setOpen={setOpen}
          onChange={onChange}
          area_id={area_id}
        />
      );
    default:
      return (
        <ToolList
          open={open}
          setOpen={setOpen}
          onChange={onChange}
          area_id={area_id}
        />
      );
  }
};

export default SwitchModal;
