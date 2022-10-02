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
  onChange?: (value: any) => any;
  setOpen?: (value: any) => any;
};

const SwitchModal: React.FC<ToolsModalProps> = ({
  onChange,
  type = ToolListNames.ToolList.name,
  open,
  setOpen,
}) => {
  // switch
  switch (type) {
    case ToolListNames.WheelOfLifeModal.name:
      return (
        <WheelOfLifeModal open={open} setOpen={setOpen} onChange={onChange} />
      );
    case ToolListNames.Checklist.name:
      return <Checklist open={open} setOpen={setOpen} onChange={onChange} />;
    case ToolListNames.Embed.name:
      return <Embed open={open} setOpen={setOpen} onChange={onChange} />;
    case ToolListNames.UploadFile.name:
      return <UploadFile open={open} setOpen={setOpen} onChange={onChange} />;
    case ToolListNames.OpenText.name:
      return <OpenText open={open} setOpen={setOpen} onChange={onChange} />;
    case ToolListNames.QuestionsForm.name:
      return (
        <QuestionsForm open={open} setOpen={setOpen} onChange={onChange} />
      );
    case ToolListNames.Video.name:
      return <Video open={open} setOpen={setOpen} onChange={onChange} />;
    case ToolListNames.ToolList.name:
      return <ToolList open={open} setOpen={setOpen} onChange={onChange} />;
    default:
      return <ToolList open={open} setOpen={setOpen} onChange={onChange} />;
  }
};

export default SwitchModal;
