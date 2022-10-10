import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { Description, Step, Task, TasktTitle, Wrapper } from './styles';

export const KanbanView: FC = () => {
  return (
    <>
      <Toolbar tabs={['Método 4S']} />
      <ContentWidthLimit maxWidth={1250}>
        <Wrapper>
          <Step>
            <Image
              alt="imagem"
              width={43}
              height={50}
              src="/svgs/step-image.svg"
            />
            <Typography variant="body2">Madrugada</Typography>

            <Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              arcu urna vel in proin gravida pretium, at. Duis ornare dignissim
              massa ornare rutrum mauris. Odio mi vulputate lacus placerat
              aenean semper id a.
            </Description>

            <Box
              sx={{ width: '100%', marginBottom: '1.2rem', cursor: 'pointer' }}
            >
              <Task>
                <TasktTitle>Vídeo de Apresentação</TasktTitle>
                <Image
                  alt="imagem"
                  width={14}
                  height={15}
                  src="/svgs/done.svg"
                />
              </Task>
              <Task>
                <TasktTitle>Vídeo de Apresentação</TasktTitle>
                <Image
                  alt="imagem"
                  width={14}
                  height={15}
                  src="/svgs/done.svg"
                />
              </Task>
            </Box>

            <Image
              alt="imagem"
              width={122}
              height={139}
              src="/images/winners.png"
            />
          </Step>
        </Wrapper>
      </ContentWidthLimit>
    </>
  );
};

export async function getProps() {
  return {
    props: {},
  };
}
export default KanbanView;
