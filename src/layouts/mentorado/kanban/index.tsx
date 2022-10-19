import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import { useMemberAreaTools } from '~/hooks/useMemberAreaTools';
import FilesDownloadModal from '../components/file-dowaload';
import { Description, Step, Task, TasktTitle, Title, Wrapper } from './styles';

export const KanbanView: FC<PageTypes.Props & { member_area_id: string }> = ({
  user,
  member_area_id,
}) => {
  const { tools } = useMemberAreaTools(member_area_id);
  const [listTools, setListTools] = useState(tools);

  useEffect(() => {
    setListTools(tools);
  }, [tools]);

  return (
    <>
      <Toolbar tabs={['Método 4S']} />
      <ContentWidthLimit maxWidth={1250}>
        <Wrapper>
          {listTools && listTools.map((group) => (
            <Step key={group.id}>
            <Image
              alt="imagem"
              width={43}
              height={50}
              src="/svgs/step-image.svg"
            />
            <Title>{group.title}</Title>

            <Box
              sx={{ width: '100%', overflowY: 'auto', height: '450px', marginTop: '1rem'}}
              >
              <Description>{group.description}</Description>
              <Task>
                <TasktTitle>Vídeo de Apresentação</TasktTitle>
                <Image
                  alt="imagem"
                  width={14}
                  height={15}
                  src="/svgs/done.svg"
                />
              </Task>
            <Image
              alt="imagem"
              width={122}
              height={139}
              src="/images/winners.png"
              style={{marginTop: '1.2rem'}}
            />
            </Box>

          </Step>
          ))}
          <FilesDownloadModal />
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
export default KanbanView;
