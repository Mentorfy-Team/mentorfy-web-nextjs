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
import { FindNextVideo, FindNotWatchedVideo } from './helpers/FindNextVideo';
import { FindVideoById } from './helpers/FindVideoById';
import { SupabaseServer } from '~/backend/supabase';
import { GetProductById } from '~/backend/repositories/product/GetProductById';
import { GetProfileById } from '~/backend/repositories/user/GetProfileById';
import CertificateModal from '../components/certificate-modal';
import { DocumentScanner } from '@mui/icons-material';
import { getProgressByStep } from '../helpers/GetProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useGetProduct } from '~/hooks/useGetProduct';

type VideoModuleType = {
  id: string;
  module_index: number;
  video_id: string;
  video_index: number;
  video: MentorTools.ToolData;
};

export const VideoView = ({
  profile,
  member_area_id,
  video_id,
  memberArea,
}) => {
  const { steps: stepsData, mutate } = useMemberAreaTools(member_area_id);
  const { inputs: inputData } = useUserInputs(member_area_id);
  const [showCertificate, setShowCertificate] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1200px)');

  const [steps, setSteps] = useState<GroupTools[]>([]);
  const [userInput, setUserInput] = useState<
    Partial<MemberAreaTypes.UserInput[]>
  >([]);

  const { product: MemberArea } = useGetProduct(member_area_id, memberArea);

  const [selectedModule, setSelectedModule] = useState<string>();

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
  }, [stepsData]);

  const HandleModal = useCallback(() => {
    if (!currentModal) return null;
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

  const mainModule = useMemo(() => {
    if (selectedModule) {
      return FindVideoById(selectedModule, steps);
    }
    return FindNotWatchedVideo(steps, inputData);
  }, [inputData, selectedModule, steps]);

  const nextVideo = useMemo(() => {
    if (!mainModule) return null;
    const rs = FindNextVideo(
      mainModule.module_index,
      mainModule.video_index,
      steps,
    );
    return rs;
  }, [mainModule, steps]);

  useEffect(() => {
    if (inputData !== userInput) {
      setUserInput(inputData);
    }
  }, [inputData, userInput]);

  const onSelectedNext = useCallback(() => {
    if (nextVideo) {
      setSelectedModule(nextVideo.video.id);
      route.push(
        {
          pathname: MentoredRoutes.video_view + '/' + member_area_id,
          query: { v: nextVideo.video.id },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [nextVideo, route, member_area_id]);

  const onSelectedVideo = useCallback(
    (id) => {
      if (!id) return;
      setSelectedModule(id);
      route.push(
        {
          pathname: MentoredRoutes.video_view + '/' + member_area_id,
          query: { v: id },
        },
        undefined,
        { shallow: true },
      );
    },
    [member_area_id, route],
  );

  const SendComment = useCallback(() => {
    if (commentRef.current.value) {
      const index = userInput?.findIndex(
        (i) => i.id.toString() == mainModule?.video?.id,
      );

      GetOnChange({
        refId: mainModule?.video?.id,
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
  }, [GetOnChange, profile, userInput, mainModule?.video?.id]);

  const handleLike = useCallback(
    (value) => {
      const index = userInput?.findIndex(
        (i) => i.member_area_tool_id.toString() == mainModule?.video?.id,
      );
      GetOnChange({
        refId: mainModule?.video?.id,
        data: {},
        extra: {
          ...(index > -1 ? userInput[index].extra : {}),
          like: value,
        },
      });
    },
    [GetOnChange, userInput, mainModule?.video?.id],
  );

  const CommentsSession = useCallback(() => {
    return (
      <Comments
        comments={
          userInput.find(
            (i) => i.member_area_tool_id.toString() == mainModule?.video?.id,
          )?.extra?.comments
        }
      />
    );
  }, [userInput, mainModule?.video?.id]);

  const renderLike = useCallback(() => {
    const like = userInput.find(
      (inp) => inp.member_area_tool_id === mainModule?.video?.id,
    )?.extra?.like;

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
  }, [handleLike, userInput, mainModule?.video?.id]);

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
          if ((steps[i].extra as any)?.lockFeature) {
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

  const isDone = useMemo(() => {
    if (!userInput || userInput.length == 0) return false;
    return steps.every((step) => getProgressByStep(step, userInput) == 100);
  }, [steps, userInput]);

  return (
    <>
      <Toolbar
        initialTab={1}
        breadcrumbs={['Minhas mentorias', memberArea?.title]}
        contact={MemberArea?.contact}
        actionClick={() => setShowCertificate(true)}
        actionTitle="Ver Certificado"
        actionIcon={<DocumentScanner fontSize="small" />}
        actionVisible={isDone}
      />
      <ContentWidthLimit maxWidth={1900}>
        {(!steps || steps.length == 0) && (
          <TipBar>
            Ainda n??o h?? <span>nenhuma etapa dispon??vel</span> para essa
            mentoria. Em caso de d??vidas, entre em contato com o suporte da
            mentoria.
          </TipBar>
        )}
        <Wrapper sx={{ flexDirection: isMobile ? 'column' : 'row' }}>
          <VideoWrapper>
            <Typography variant="h6" sx={{ margin: '1rem 0' }}>
              {mainModule?.video?.parent_tool?.title} -
              {mainModule?.video?.title}
            </Typography>
            {mainModule?.video?.type != 4 && (
              <Box
                sx={{
                  width: '985px',
                  height: '554px',
                  backgroundColor: 'black',
                }}
              ></Box>
            )}
            {mainModule?.video?.type == 4 && (
              <Box
                sx={{
                  maxWidth: isMobile ? '100%' : '985px',
                  height: isMobile ? 'auto' : '554px',
                  aspectRatio: isMobile ? '16/9' : 'none',
                  backgroundColor: 'black',
                }}
              >
                <ReactPlayer
                  url={(mainModule?.video?.data as any)?.link}
                  width="100%"
                  onEnded={() =>
                    GetOnChange({
                      refId: mainModule?.video.id,
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
            )}
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
                {userInput.find(
                  (inp) => inp.id?.toString() === mainModule?.video?.id,
                ) && (
                  <CompleteButton>
                    Conclu??do
                    <Image
                      alt=""
                      width={15}
                      height={15}
                      src="/svgs/done-simbol.svg"
                    />
                  </CompleteButton>
                )}
              </Box>
              {nextVideo?.video_index && (
                <NextVButton onClick={() => onSelectedNext()}>
                  Pr??ximo
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
              sx={{
                margin: isMobile ? ' 0' : '1rem 0',
                maxWidth: 980,
                width: '100%',
              }}
            >
              {mainModule?.video?.description}
            </Typography>

            {!isMobile && (
              <>
                <Typography
                  variant="body1"
                  sx={{ margin: '2.5rem 0 0.8rem 0' }}
                >
                  Coment??rios ( Apenas o mentor pode ver )
                </Typography>

                <Box sx={{ width: '100%', display: 'flex', gap: '0.5rem' }}>
                  <CommentInput
                    ref={commentRef}
                    placeholder="Deixar mensagem para o mentor"
                  />
                  <SendButton onClick={() => SendComment()} variant="contained">
                    Enviar
                    <Image
                      alt=""
                      width={15}
                      height={15}
                      src="/svgs/share.svg"
                    />
                  </SendButton>
                </Box>
                <CommentsSession />
              </>
            )}
          </VideoWrapper>
          <ProgressBarWrapper
            sx={{
              padding: '1rem 0 0 2rem',
              maxHeight: isMobile ? '346px' : '',
              overflowY: isMobile ? 'auto' : 'none',
            }}
          >
            <ProgressBar
              data={steps.filter(({ id }) => unlockedStep.some((s) => s == id))}
              input={userInput}
              activeid={mainModule?.video?.id}
              activeStepId={mainModule?.module?.id}
              onGoTo={(id, task) => {
                if (task.type == 4) {
                  onSelectedVideo(id);
                } else {
                  setCurrentModal({
                    onChange: () => {},
                    type: GetTypeName(task.type),
                    refId: id,
                    area_id: member_area_id,
                    data: task,
                  });
                  setOpen(true);
                }
              }}
            />
          </ProgressBarWrapper>
          {isMobile && (
            <>
              <Typography
                variant="body1"
                sx={{ margin: '2.5rem auto 0.8rem 0' }}
              >
                Coment??rios ( Apenas o mentor pode ver )
              </Typography>

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  gap: '0.5rem',
                  flexDirection: isMobile ? 'column' : 'row',
                }}
              >
                <CommentInput
                  ref={commentRef}
                  placeholder="Deixar mensagem para o mentor"
                />
                <SendButton
                  onClick={() => SendComment()}
                  variant="contained"
                  sx={{ marginLeft: isMobile ? 'auto' : '0' }}
                >
                  Enviar
                  <Image alt="" width={15} height={15} src="/svgs/share.svg" />
                </SendButton>
              </Box>
              <CommentsSession />
            </>
          )}
        </Wrapper>
      </ContentWidthLimit>
      <HandleModal />
      {showCertificate && (
        <CertificateModal
          open={showCertificate}
          setOpen={setShowCertificate}
          product={memberArea}
          profile={profile}
        />
      )}
    </>
  );
};

// * ServerSideRender (SSR)
export const getProps = async (ctx) => {
  const { session } = await GetAuthSession(ctx);
  let id = ctx.query?.id as string;

  if (id.includes('pdf')) id = null;

  if (!session || !id)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const video_id = (ctx.query.v || 0) as string;

  const supabase = SupabaseServer(ctx.req, ctx.res);
  const product = await GetProductById(supabase, {
    id: ctx.query.id,
  });

  const { profile } = await GetProfileById(supabase, {
    id: session.user.id,
  });

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      member_area_id: id,
      video_id,
      memberArea: {
        id: product.id,
        title: product.title,
        description: product.description,
      },
      profile,
    },
  };
};

export default VideoView;
