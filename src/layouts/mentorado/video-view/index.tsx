import { useCallback, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { DnDObject } from '~/components/modules/DragNDrop';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import { OrganizeTools } from '~/helpers/OrganizeTools';
import { useMemberAreaTools } from '~/hooks/useMemberAreaTools';
import SwitchMentoredModal, { ToolListNames } from '../helpers/SwitchModal';
import { UserInput } from '../kanban';
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

export const VideoView = ({ member_area_id }) => {
  const { steps: stepsData, mutate } = useMemberAreaTools(member_area_id);
  const [steps, setSteps] = useState<DnDObject[]>([]);
  const [userInput, setUserInput] = useState<UserInput[]>([]);
  const [open, setOpen] = useState(false);

  const [currentModal, setCurrentModal] = useState<{
    onChange: any;
    type: string;
    refId?: string;
    area_id?: string;
    data?: any;
  }>();

  useEffect(() => {
    setSteps((oldSteps) => {
      oldSteps = [...OrganizeTools(stepsData)];
      return [...oldSteps];
    });
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
        userInput={
          userInput.find((inp) => inp.tool_id === currentModal.refId)?.data
        }
      />
    );
  }, [currentModal, open, member_area_id, userInput]);

  const GetTypeName = useCallback((type) => {
    return Object.values(ToolListNames).find((i) => {
      return i.id == parseInt(type);
    }).name;
  }, []);

  const handleSave = useCallback(async () => {
    // timout para dar tempo para as imagens se organizarem
    setTimeout(async function () {
      //await InputUserMemberArea(member_area_id, userInput);
      mutate();
    }, 1000);
  }, [mutate]);

  const GetOnChange = useCallback(
    async ({ refId, data }) => {
      setUserInput((oldInput) => {
        const index = oldInput.findIndex((i) => i.tool_id == refId);
        if (index > -1) {
          oldInput[index].data = data;
        } else {
          oldInput.push({ tool_id: refId, data });
        }
        return [...oldInput];
      });

      handleSave();
    },
    [handleSave],
  );

  return (
    <>
      <Toolbar tabs={['Método 4S']} />
      <ContentWidthLimit maxWidth={1900}>
        <Wrapper>
          <VideoWrapper>
            <Typography variant="h6" sx={{ margin: '1rem 0' }}>
              Seja Bem-vindo(a)
            </Typography>
            <Box
              sx={{ width: '985px', height: '509px', backgroundColor: 'black' }}
            ></Box>
            <IconButton sx={{ float: 'right' }}>
              <Image
                alt=""
                width={15}
                height={15}
                src="/svgs/arrow-expand.svg"
              />
            </IconButton>

            <VideoInteractionsBox>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <LikeButton>
                  <Image
                    alt=""
                    width={24}
                    height={24}
                    src="/svgs/like-thumb.svg"
                  />
                </LikeButton>
                <LikeButton>
                  <Image
                    alt=""
                    width={24}
                    height={24}
                    src="/svgs/unlike-thumb.svg"
                  />
                </LikeButton>
                <CompleteButton>
                  Concluído
                  <Image
                    alt=""
                    width={15}
                    height={15}
                    src="/svgs/done-simbol.svg"
                  />
                </CompleteButton>
              </Box>
              <NextVButton>
                Próximo
                <Image
                  alt=""
                  width={15}
                  height={15}
                  src="/svgs/arrow-right.svg"
                />
              </NextVButton>
            </VideoInteractionsBox>

            <Typography variant="body1" sx={{ margin: '2.5rem 0 0.8rem 0' }}>
              Comentários
            </Typography>

            <Box sx={{ width: '100%', display: 'flex', gap: '0.5rem' }}>
              <CommentInput placeholder="Deixe seu comentário" />
              <SendButton variant="contained">
                Enviar
                <Image alt="" width={15} height={15} src="/svgs/share.svg" />
              </SendButton>
            </Box>
          </VideoWrapper>
          <ProgressBarWrapper></ProgressBarWrapper>
        </Wrapper>
      </ContentWidthLimit>
    </>
  );
};

// * ServerSideRender (SSR)
export const getProps = withPageAuth({
  authRequired: true,
  redirectTo: PublicRoutes.login,
  async getServerSideProps(ctx) {
    const id = ctx.query.id as string;
    return {
      props: {
        member_area_id: id,
      },
    };
  },
});
export default VideoView;
