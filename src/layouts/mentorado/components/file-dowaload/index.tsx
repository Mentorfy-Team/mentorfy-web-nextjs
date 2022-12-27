import { useState } from 'react';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import Description from '~/components/atoms/ModalDescription';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { DownloadText, DownloaddButton, FileWrapper } from './styles';
import TipBar from '~/components/modules/TipBar';

const PDFReader = dynamic(
  () => import('~/components/atoms/PDFReader/PDFReader'),
  {
    ssr: false,
  },
);

type InputProps = { id: string; value: boolean }[];
type ExtraProps = boolean;

type ToolProps = {
  name: string;
  size: number;
  sourceUrl: string;
  type: string;
}[];

const FilesDownloadModal = ({
  open,
  setOpen,
  data: { data: taskData, title: titleData, description: descriptionData },
  onChange,
  userInput,
}: MentoredComponents.Props<ToolProps, InputProps, ExtraProps>) => {
  const [input, setInput] = useState(userInput?.data || []);

  const handleFinish = () => {
    onChange({
      data: {},
      extra: {
        finished: true,
      },
    });
    setOpen(false);
  };

  const HeadText = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Image
        alt="perguntas"
        src="/svgs/files-download-icon.svg"
        height={20}
        width={22}
      />
      <>{titleData}</>
    </Box>
  );
  return (
    <ModalComponent open={open} setOpen={setOpen} title={HeadText} isMentorado>
      <ModalDialogContent isMentorado sx={{ textAlign: 'center' }}>
        {!taskData && (
          <TipBar>
            Ainda não há <span>nenhum conteúdo disponível</span> nossa etapa. Em
            caso de dúvidas, entre em contato com o suporte da mentoria.
          </TipBar>
        )}
        {taskData && (
          <Box sx={{ width: '90%' }}>
            <Description>{descriptionData}</Description>
            Pré Visualização:
            <FileWrapper>
              <PDFReader file={taskData[0].sourceUrl} />
            </FileWrapper>
          </Box>
        )}

        {taskData && (
          <DownloadText>
            Para ver o arquivo completo, clique no botão abaixo.
          </DownloadText>
        )}
        {taskData && (
          <DownloaddButton
            as="a"
            href={taskData[0].sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            onClick={handleFinish}
          >
            BAIXAR ARQUIVO
          </DownloaddButton>
        )}
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default FilesDownloadModal;
