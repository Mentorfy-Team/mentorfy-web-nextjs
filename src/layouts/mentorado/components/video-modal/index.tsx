import { useState } from 'react';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { CompleteButton, Description } from './styles';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

type InputProps = { id: string; value: boolean }[];
type ExtraProps = boolean;

type ToolProps = {
  link: string;
};
type ToolExtra = {
  name: string;
  size: number;
  sourceUrl: string;
  type: string;
};

const VideoViewModal = ({
  open,
  setOpen,
  data: {
    data: taskData,
    title: titleData,
    description: descriptionData,
    extra,
  },
  onChange,
  userInput,
}: MentoredComponents.Props<ToolProps, InputProps, ExtraProps, ToolExtra>) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState(userInput?.data || []);

  const handleFinish = () => {
    onChange({
      data: {},
      finished: true,
    });
    setOpen(false);
  };

  const HeadText = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Image alt="vídeo" src="/svgs/video-icon.svg" height={20} width={18} />
      <>{titleData}</>
    </Box>
  );
  return (
    <ModalComponent title={HeadText} setOpen={setOpen} open={open} isMentorado>
      <ModalDialogContent isMentorado>
        <Description>{descriptionData}</Description>
        <Box sx={{ width: '720px', height: '420px', backgroundColor: 'black' }}>
          {taskData?.link && (
            <ReactPlayer
              id="goto"
              url={taskData.link}
              width="100%"
              height="100%"
              controls={true}
              playing={true}
              light={extra.sourceUrl || null}
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 1,
                    controls: 1,
                    autoplay: 1,
                    disablekb: 0,
                  },
                },
              }}
            />
          )}
        </Box>

        <CompleteButton variant="contained" onClick={handleFinish}>
          Concluído
        </CompleteButton>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default VideoViewModal;
