import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import TipBar from '~/components/modules/TipBar';
import Comments from './components/comments';
import { GetAuthSession } from '~/helpers/AuthSession';
import { GetProduct } from '~/services/product.service';
import { GetProfile } from '~/services/profile.service';

export const VideoView = ({
  profile,
  member_area_id,
  video_id,
  memberArea,
}) => {
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
    if (stepsData) setSteps(JSON.parse(JSON.stringify(stepsData)));
    setVideosOrdem(
      stepsData
        .filter((step) => step.type === ToolListNames.Video.id)
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
        // route.push(
        //   {
        //     pathname: MentoredRoutes.video_view + '/' + member_area_id,
        //     query: { v: id },
        //   },
        //   undefined,
        //   { shallow: true },
        // );
      }
      setNextVideoId(nextVideo);
    } else {
      setVideoId(null);
    }
  }, [steps, video_id, videoId]);

  useEffect(() => {
    if (inputData !== userInput) {
      setUserInput(inputData);
    }
    GetCurrentVideo();
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
    console.log(steps.find((stp) => stp.rows.find((row) => row.id == videoId)));
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
            {
              comment: commentRef.current.value,
              user_id: profile.id,
              created_at: new Date().toString(),
            },
          ],
        },
      });

      commentRef.current.value = '';
    }
  }, [GetOnChange, profile, userInput, videoId]);

  const handleLike = useCallback(
    (value) => {
      const index = userInput?.findIndex(
        (i) => i.member_area_tool_id.toString() == videoId,
      );
      GetOnChange({
        refId: videoId,
        data: {},
        extra: {
          ...(index > -1 ? userInput[index].extra : {}),
          like: value,
        },
      });
    },
    [GetOnChange, userInput, videoId],
  );

  const CommentsSession = useCallback(() => {
    return (
      <Comments
        comments={
          userInput.find((i) => i.member_area_tool_id.toString() == videoId)
            ?.extra?.comments
        }
      />
    );
  }, [userInput, videoId]);

  const renderLike = useCallback(() => {
    const like = userInput.find((inp) => inp.member_area_tool_id === videoId)
      ?.extra?.like;

    return (
      <>
        <LikeButton
          sx={{
            opacity: 0.8,
            backgroundColor:
              like?.toString() === 'true' ? '#36c059' : 'transparent',
          }}
          onClick={() => handleLike(true)}
        >
          <Image alt="" width={24} height={24} src="/svgs/like-thumb.svg" />
        </LikeButton>
        <LikeButton
          sx={{
            opacity: 0.8,
            backgroundColor:
              like?.toString() === 'false' ? '#c03636' : 'transparent',
          }}
          onClick={() => handleLike(false)}
        >
          <Image alt="" width={24} height={24} src="/svgs/unlike-thumb.svg" />
        </LikeButton>
      </>
    );
  }, [handleLike, userInput, videoId]);

  const unlockedStep = useMemo(() => {
    const unlocked = [];
    for (let i = 0; i < steps.length; i++) {
      if (i === 0) {
        unlocked.push(steps[i].id);
      } else {
        const tasks = steps[i].rows;

        const doneTasks = tasks?.filter((t) => {
          const input = userInput?.find((i) => i.member_area_tool_id == t.id);
          return !!input;
        });

        if (doneTasks?.length == tasks?.length) {
          unlocked.push(steps[i].id);
        } else {
          if ((steps[i].extra as any).lockFeature) {
            unlocked.push(steps[i].id);
            break;
          } else {
            unlocked.push(steps[i].id);
          }
        }
      }
    }
    return unlocked;
  }, [steps, userInput]);

  return (
    <>
      <Toolbar
        initialTab={1}
        breadcrumbs={['Minhas mentorias', memberArea.title]}
      />
      <ContentWidthLimit maxWidth={1900}>
        {(!steps || steps.length == 0) && (
          <TipBar>
            Ainda não há <span>nenhuma etapa disponível</span> para essa
            mentoria. Em caso de dúvidas, entre em contato com o suporte da
            mentoria.
          </TipBar>
        )}
        <Wrapper>
          <VideoWrapper>
            <Typography variant="h6" sx={{ margin: '1rem 0' }}>
              {getVideo()?.parent_tool?.title} - {getVideo()?.title}
            </Typography>
            <Box
              sx={{ width: '985px', height: '554px', backgroundColor: 'black' }}
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
                {renderLike()}
                {userInput.find((inp) => inp.id?.toString() === videoId) && (
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
              <SendButton onClick={() => SendComment()} variant="contained">
                Enviar
                <Image alt="" width={15} height={15} src="/svgs/share.svg" />
              </SendButton>
            </Box>
            <CommentsSession />
          </VideoWrapper>
          <ProgressBarWrapper
            sx={{
              padding: '1rem 0 0 2rem',
            }}
          >
            <ProgressBar
              data={steps.filter(({ id }) => unlockedStep.some((s) => s == id))}
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
  const profile = await GetProfile(ctx.req);

  return {
    props: {
      member_area_id: id,
      video_id,
      memberArea: {
        id: memberArea.id,
        title: memberArea.title,
        description: memberArea.description,
      },
      profile,
    },
  };
};

export default VideoView;
