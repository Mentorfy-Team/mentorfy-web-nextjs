import { useRef, useState } from 'react';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { useProfile } from '~/hooks/useProfile';
import {
  CommentInput,
  CompleteButton,
  Description,
  SendButton,
} from './styles';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

type InputProps = {
  id?: string;
  value?: boolean;
};
type ExtraProps = {
  comments: {
    user_id: string;
    comment: string;
    created_at: string;
  }[];
};

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
  const [input, setInput] = useState<Partial<ExtraProps>>(
    userInput?.extra || {},
  );
  const {
    data: { profile },
  } = useProfile();
  const { data } = useProfile();
  const commentRef = useRef(null);

  const handleFinish = () => {
    onChange({
      data: {},
      extra: {
        finished: true,
      },
    });
    setOpen(false);
  };

  const handleComment = () => {
    const comment = commentRef.current.value;
    if (comment) {
      setInput((inp) => {
        const newInput = { ...inp };
        const comments = newInput.comments || [];
        comments.push({
          user_id: data.profile.id,
          comment,
          // data to human readable
          created_at: new Date().toString(),
        });
        newInput.comments = comments;
        return newInput;
      });
      commentRef.current.value = '';
    }

    onChange({
      data: {},
      extra: {
        ...extra,
        comments: [
          ...(input.comments || []),
          {
            user_id: data.profile.id,
            comment,
            created_at: new Date().toString(),
          },
        ],
      },
    });
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
              light={extra?.sourceUrl || null}
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 1,
                    controls: 1,
                    disablekb: 0,
                  },
                },
              }}
            />
          )}
        </Box>
        <CompleteButton variant="contained" onClick={handleFinish}>
          Concluír
        </CompleteButton>

        <Typography variant="body1" sx={{ margin: '2.5rem 0 0.8rem 0' }}>
          Enviar mensagem ao Mentor
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2rem',
          }}
        >
          <CommentInput ref={commentRef} placeholder="Deixe sua mensagem" />
          <SendButton onClick={() => handleComment()} variant="contained">
            Enviar
          </SendButton>
        </Box>
        {input.comments && input.comments?.length > 0 && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {input.comments
              .sort((a, b) => {
                return (
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
                );
              })
              .map(({ comment, created_at }, index) => (
                <>
                  <Box sx={{ width: '100%', display: 'flex', gap: '1rem' }}>
                    <Avatar src={data.profile.avatar} />
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      <Typography
                        key={index}
                        variant="body2"
                        sx={{ marginTop: '-0.2rem' }}
                      >
                        {profile.name}
                        <Typography ml={3} color="gray" variant="caption">
                          {new Date(created_at).toLocaleString('pt-BR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                          })}
                        </Typography>
                      </Typography>
                      <Typography
                        key={index}
                        variant="body1"
                        sx={{ marginTop: '-0.3rem' }}
                      >
                        {comment}
                      </Typography>
                    </Box>
                  </Box>
                </>
              ))}
          </Box>
        )}
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default VideoViewModal;
