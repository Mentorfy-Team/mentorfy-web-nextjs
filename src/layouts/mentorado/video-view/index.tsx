import { useCallback, useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { GroupTools } from '~/components/modules/DragNDrop';
import ProgressBar from '~/components/modules/ProgressBar';
import Toolbar from '~/components/modules/Toolbar';
import { MentoredRoutes } from '~/consts';
import { OrganizeTools } from '~/helpers/OrganizeTools';
import { useMemberAreaTools } from '~/hooks/useMemberAreaTools';
import { useUserInputs } from '~/hooks/useUserInputs';
import { InputUserMemberArea } from '~/services/member-area.service';
import SwitchMentoredModal, { ToolListNames } from '../helpers/SwitchModal';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
import {
  CommentInput,
  CompleteButton,
  LikeButton,
  NextVButton,
  ProgressBarWrapper,
  SendButton,
  VideoInteractionsBox,
  VideoWrapper,
  Wrapper,
} from './styles';
import { GetAuthSession } from '~/helpers/AuthSession';
import { GetProduct } from '~/services/product.service';

export const VideoView = ({ member_area_id, video_id, memberArea }) => {
  const { steps: stepsData, mutate } = useMemberAreaTools(member_area_id);
  const [videoId, setVideoId] = useState<string>(video_id);
  const [nextVideoId, setNextVideoId] = useState<string>(null);
  const { inputs: inputData } = useUserInputs(member_area_id);
  const [steps, setSteps] = useState<GroupTools[]>([]);
  const [videosOrdem, setVideosOrdem] = useState<MentorTools.ToolData[]>([]);
  const [userInput, setUserInput] = useState<
    Partial<MemberAreaTypes.UserInput[]>
  >([]);
  const [open, setOpen] = useState(false);

  const commentRef = useRef(null);

  const [currentModal, setCurrentModal] = useState<{
    onChange: any;
    type: string;
    refId?: string;
    area_id?: string;
    data?: any;
  }>();
  const route = useRouter();

  useEffect(() => {
    setSteps((oldSteps) => {
      oldSteps = [...OrganizeTools(stepsData, ToolListNames.Video.id)];
      return [...oldSteps];
    });
    setVideosOrdem(
      stepsData
        .filter((step) => step.mentor_tool === ToolListNames.Video.id)
        .sort((a, b) => a.order - b.order),
    );
  }, [stepsData]);

  const HandleModal = useCallback(() => {
    return (
      <SwitchMentoredModal
        open={open}
        setOpen={setOpen}
        onChange={currentModal.onChange}
        type={currentModal.type}
        refId={currentModal.refId}
        area_id={member_area_id}
        data={currentModal.data}
        userInput={userInput?.find(
          (inp) => inp.member_area_tool_id.toString() === currentModal.refId,
        )}
      />
    );
  }, [currentModal, open, member_area_id, userInput]);

  const GetTypeName = useCallback((type) => {
    return Object.values(ToolListNames).find((i) => {
      return i.id == parseInt(type);
    }).name;
  }, []);

  const handleSave = useCallback(
    async ({ tool_id, client_input }) => {
      // timout para dar tempo para as imagens se organizarem
      setTimeout(async function () {
        await InputUserMemberArea(tool_id, client_input, member_area_id);
        mutate();
      }, 1000);
    },
    [mutate, member_area_id],
  );

  const GetOnChange = useCallback(
    async ({ refId, data, extra }) => {
      const index = userInput?.findIndex((i) => i.member_area_tool_id == refId);
      setUserInput((oldInput) => {
        if (!oldInput) oldInput = [];
        if (index > -1) {
          if (data) oldInput[index].data = data;
          if (extra) oldInput[index].extra = extra;
        } else {
          oldInput?.push({
            member_area_tool_id: refId,
            data,
            extra,
          } as any);
        }
        return [...oldInput];
      });
      handleSave({
        tool_id: refId,
        client_input: {
          data: userInput[index]
            ? Object.assign(userInput[index].data, data)
            : data,
          extra: userInput[index]
            ? Object.assign(userInput[index].extra, extra)
            : extra,
          id: index > -1 ? userInput[index].id : '0',
          delete: data.delete,
        },
      });
    },
    [handleSave, userInput],
  );

  // search for the first not finished step and set the video id
  const GetCurrentVideo = useCallback(() => {
    let lastId;
    let nextVideo;
    steps.forEach((stp) => {
      if (!nextVideo)
        stp.rows.find((row) => {
          if (lastId) {
            nextVideo = row.id;
          }
          if (!(row.extra as any)?.finished && !nextVideo) {
            lastId = row.id;
          }
        });
    });

    if (lastId) {
      if (lastId !== videoId) {
        const id = !video_id ? lastId : video_id;
        setVideoId(id);
        route.push({
          pathname: MentoredRoutes.video_view + '/' + member_area_id,
          query: { v: id },
        });
      }
      setNextVideoId(nextVideo);
    } else {
      setVideoId(null);
    }
  }, [steps, route, video_id, member_area_id, videoId]);

  useEffect(() => {
    if (inputData !== userInput) {
      setUserInput(inputData);
      GetCurrentVideo();
    }
  }, [GetCurrentVideo, inputData, userInput]);

  const onSelectedNext = useCallback(() => {
    const next = videosOrdem.findIndex((i) => i.id == videoId) + 1;

    if (next !== 0 && next < videosOrdem.length) {
      setVideoId(videosOrdem[next].id);
      route.push(
        {
          pathname: MentoredRoutes.video_view + '/' + member_area_id,
          query: { v: videosOrdem[next].id },
        },
        undefined,
        { shallow: true },
      );
    }
    if (next + 1 >= videosOrdem.length) {
      setNextVideoId(null);
    }
  }, [videosOrdem, videoId, route, member_area_id]);

  const onSelectedVideo = useCallback(
    (id) => {
      if (!id) return;
      setVideoId(id);
      route.push(
        {
          pathname: MentoredRoutes.video_view + '/' + member_area_id,
          query: { v: id },
        },
        undefined,
        { shallow: true },
      );

      const next = videosOrdem.findIndex((i) => i.id == id) + 1;
      if (next >= videosOrdem.length) {
        setNextVideoId(null);
      } else {
        setNextVideoId(videosOrdem[next].id);
      }
    },
    [member_area_id, route, videosOrdem],
  );

  const getVideo = useCallback(() => {
    const video = steps
      .find((stp) => stp.rows.find((row) => row.id == videoId))
      ?.rows.find((row) => row.id == videoId);
    return video;
  }, [steps, videoId]);

  const SendComment = useCallback(() => {
    if (commentRef.current.value) {
      const index = userInput?.findIndex((i) => i.id.toString() == videoId);

      GetOnChange({
        refId: videoId,
        data: {},
        extra: {
          ...(index > -1 ? userInput[index].extra : {}),
          comments: [
            ...(index > -1 ? userInput[index].extra.comments : []),
            commentRef.current.value,
          ],
        },
      });

      commentRef.current.value = '';
    }
  }, [GetOnChange, userInput, videoId]);

  const handleLike = useCallback(() => {
    // TODO: implementar like
  }, []);

  return (
    <>
      <Toolbar tabs={[memberArea.title]} />
      <ContentWidthLimit maxWidth={1900}>
        <Wrapper>
          <VideoWrapper>
            <Typography variant="h6" sx={{ margin: '1rem 0' }}>
              {getVideo()?.title}
            </Typography>
            <Box
              sx={{ width: '985px', height: '509px', backgroundColor: 'black' }}
            >
              <ReactPlayer
                url={(getVideo()?.data as any)?.link}
                width="100%"
                onEnded={() =>
                  GetOnChange({
                    refId: videoId,
                    data: {},
                    extra: {
                      finished: true,
                    },
                  })
                }
                height="100%"
                controls={true}
                config={{
                  youtube: {
                    playerVars: {
                      showinfo: 0,
                      controls: 1,
                      disablekb: 0,
                    },
                  },
                }}
              />
            </Box>
            {/* <IconButton sx={{ float: 'right' }}>
              <Image
                alt=""
                width={15}
                height={15}
                src="/svgs/arrow-expand.svg"
              />
            </IconButton> */}
            <VideoInteractionsBox>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <LikeButton onClick={() => {}}>
                  <Image
                    alt=""
                    width={24}
                    height={24}
                    src="/svgs/like-thumb.svg"
                  />
                </LikeButton>
                <LikeButton onClick={() => {}}>
                  <Image
                    alt=""
                    width={24}
                    height={24}
                    src="/svgs/unlike-thumb.svg"
                  />
                </LikeButton>
                {userInput.find((inp) => inp.id.toString() === videoId) && (
                  <CompleteButton>
                    Concluído
                    <Image
                      alt=""
                      width={15}
                      height={15}
                      src="/svgs/done-simbol.svg"
                    />
                  </CompleteButton>
                )}
              </Box>
              {nextVideoId && (
                <NextVButton onClick={() => onSelectedNext()}>
                  Próximo
                  <Image
                    alt=""
                    width={15}
                    height={15}
                    src="/svgs/arrow-right.svg"
                  />
                </NextVButton>
              )}
            </VideoInteractionsBox>

            <Typography
              variant="body1"
              sx={{ margin: '1rem 0', maxWidth: 980, width: '100%' }}
            >
              {getVideo()?.description}
            </Typography>

            <Typography variant="body1" sx={{ margin: '2.5rem 0 0.8rem 0' }}>
              Comentários ( Apenas o mentor pode ver )
            </Typography>

            <Box sx={{ width: '100%', display: 'flex', gap: '0.5rem' }}>
              <CommentInput
                ref={commentRef}
                placeholder="Deixar mensagem para o mentor"
              />
              <SendButton onClick={() => handleLike()} variant="contained">
                Enviar
                <Image alt="" width={15} height={15} src="/svgs/share.svg" />
              </SendButton>
            </Box>
          </VideoWrapper>
          <ProgressBarWrapper
            sx={{
              padding: '1rem 0 0 2rem',
            }}
          >
            <ProgressBar
              data={steps}
              input={userInput}
              activeid={videoId}
              onGoTo={(id) => onSelectedVideo(id)}
            />
          </ProgressBarWrapper>
        </Wrapper>
      </ContentWidthLimit>
    </>
  );
};

// * ServerSideRender (SSR)
export const getProps = async (ctx) => {
  const { session } = await GetAuthSession(ctx);

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const id = ctx.query.id as string;
  const video_id = (ctx.query.v || 0) as string;

  // fetch for member area
  const memberArea = await GetProduct(ctx.req, id);

  return {
    props: {
      member_area_id: id,
      video_id,
      memberArea: {
        id: memberArea.id,
        title: memberArea.title,
        description: memberArea.description,
      },
    },
  };
};

export default VideoView;
