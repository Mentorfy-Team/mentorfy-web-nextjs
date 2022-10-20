import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { DnDObject } from '~/components/modules/DragNDrop';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import { OrganizeTools } from '~/helpers/OrganizeTools';
import { useMemberAreaTools } from '~/hooks/useMemberAreaTools';
import { Description, Step, Task, TasktTitle, Title, Wrapper } from './styles';

export const KanbanView: FC<PageTypes.Props & { member_area_id: string }> = ({
  user,
  member_area_id,
}) => {
  const { steps: stepsData } = useMemberAreaTools(member_area_id);
  const [steps, setSteps] = useState<DnDObject[]>([]);

  useEffect(() => {
    setSteps((oldSteps) => {
      oldSteps = [...OrganizeTools(stepsData)];
      return [...oldSteps];
    });
  }, [stepsData]);

  return (
    <>
      <Toolbar tabs={['Método 4S']} />
      <ContentWidthLimit>
        <Wrapper>
          {steps &&
            steps.map((step) => (
              <Step key={step.id}>
                <Image
                  alt="imagem"
                  width={43}
                  height={50}
                  src="/svgs/step-image.svg"
                />
                <Title>{step.title}</Title>
                <Box
                  sx={{
                    width: '100%',
                    overflowY: 'auto',
                    marginTop: '1rem',
                    marginRight: step.rows.length > 5 ? '-1.2rem' : 0,
                    paddingRight: step.rows.length > 5 ? '0.5rem' : 0,
                  }}
                >
                  <Description>{step.description}</Description>
                  {step.rows.map((task) => (
                    <Task key={task.id}>
                      <TasktTitle sx={{ textAlign: 'start' }}>
                        {task.title}
                      </TasktTitle>
                      <Image
                        alt="imagem"
                        width={14}
                        height={15}
                        src="/svgs/done.svg"
                      />
                    </Task>
                  ))}
                  <Image
                    alt="imagem"
                    width={122}
                    height={139}
                    src="/images/winners.png"
                    style={{ marginTop: '1.2rem' }}
                  />
                </Box>
              </Step>
            ))}
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
