import React from 'react';
import dynamic from 'next/dynamic';

const Checklist = dynamic(() => import('../components/ChecklistModal'));
const Embed = dynamic(() => import('../components/EmbedModal'));
const OpenText = dynamic(() => import('../components/OpenTextFieldModal'));
const QuestionsForm = dynamic(() => import('../components/QuestionsFormModal'));
const UploadFile = dynamic(() => import('../components/UploadFileModal'));
const WheelOfLifeModal = dynamic(
  () => import('../components/WheelOfLifeModal'),
);
const Video = dynamic(() => import('../components/VideoModal'));
const ToolList = dynamic(() => import('../components/ToolListModal'));

export const ToolListNames = {
  QuestionsForm: { name: 'Formulário de Perguntas', id: 1 },
  UploadFile: { name: 'Upload de Arquivos', id: 2 },
  Checklist: { name: 'Checklist', id: 3 },
  Video: { name: 'Upload de Vídeo', id: 4 },
  Embed: { name: 'Embed', id: 5 },
  OpenText: { name: 'Campo de Texto Aberto', id: 6 },
  WheelOfLifeModal: { name: 'Roda da Vida', id: 7 },
  Calendar: { name: 'Calendário', id: 8 },
  ToolList: { name: 'Lista de Ferramentas', id: 9 },
};

export type ToolsModalProps = {
  open: boolean;
  type?: string;
  refId?: string;
  data: any;
  onChange?: (value: any) => any;
  setOpen?: (value: any) => any;
};

const SwitchModal: React.FC<ToolsModalProps> = ({
  onChange,
  data,
  type = ToolListNames.ToolList.name,
  open,
  setOpen,
  refId,
}) => {
  switch (type) {
    case ToolListNames.WheelOfLifeModal.name:
      return (
        <WheelOfLifeModal
          data={data}
          open={open}
          setOpen={setOpen}
          onChange={(props) => onChange({ data: props, refId })}
        />
      );
    case ToolListNames.Checklist.name:
      return (
        <Checklist
          data={data}
          open={open}
          setOpen={setOpen}
          onChange={(props) => onChange({ data: props, refId })}
        />
      );
    case ToolListNames.Embed.name:
      return (
        <Embed
          data={data}
          open={open}
          setOpen={setOpen}
          onChange={(props) => onChange({ data: props, refId })}
        />
      );
    case ToolListNames.UploadFile.name:
      return (
        <UploadFile
          data={data}
          open={open}
          setOpen={setOpen}
          onChange={(props) => onChange({ data: props, refId })}
        />
      );
    case ToolListNames.OpenText.name:
      return (
        <OpenText
          data={data}
          open={open}
          setOpen={setOpen}
          onChange={(props) => onChange({ data: props, refId })}
        />
      );
    case ToolListNames.QuestionsForm.name:
      return (
        <QuestionsForm
          data={data}
          open={open}
          setOpen={setOpen}
          onChange={(props) => onChange({ data: props, refId })}
        />
      );
    case ToolListNames.Video.name:
      return (
        <Video
          open={open}
          setOpen={setOpen}
          onChange={(props) => onChange({ data: props, refId })}
        />
      );
    case ToolListNames.ToolList.name:
      return <ToolList open={open} setOpen={setOpen} onChange={onChange} />;
    default:
      return <ToolList open={open} setOpen={setOpen} onChange={onChange} />;
  }
};

export default SwitchModal;
