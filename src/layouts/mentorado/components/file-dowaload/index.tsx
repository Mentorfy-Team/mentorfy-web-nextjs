import { useState } from 'react';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { DownloadText, DownloaddButton, FileWrapper } from './styles';

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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState(userInput?.data || []);

  const handleFinish = () => {
    //onChange({ data: input, finished: true });
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
      <>Título do Formulário</>
    </Box>
  );
  return (
    <ModalComponent open={open} setOpen={setOpen} title={HeadText} isMentorado>
      <ModalDialogContent isMentorado sx={{ textAlign: 'center' }}>
        {console.log(taskData[0])}
        <FileWrapper>
          <PDFReader file={taskData[0].sourceUrl} />
        </FileWrapper>

        <DownloadText>Faça o download abaixo</DownloadText>
        <DownloaddButton
          as="a"
          href={taskData[0].sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          onClick={handleFinish}
        >
          DOWNLOAD
        </DownloaddButton>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default FilesDownloadModal;
