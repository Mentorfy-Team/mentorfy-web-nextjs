import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import { useMemberAreaTools } from '~/hooks/useMemberAreaTools';
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
  const { steps: stepsData } = useMemberAreaTools(member_area_id);

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
