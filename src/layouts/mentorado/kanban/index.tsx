import { FC, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { DnDObject } from '~/components/modules/DragNDrop';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import { OrganizeTools } from '~/helpers/OrganizeTools';
import { useMemberAreaTools } from '~/hooks/useMemberAreaTools';
import { FilesToDelete } from '~/services/file-upload.service';
import { InputUserMemberArea } from '~/services/member-area.service';
import { ToolListNames, ToolsModalProps } from '../helpers/SwitchModal';
import { Description, Step, Task, TasktTitle, Title, Wrapper } from './styles';

const SwitchMentoredModal = dynamic<ToolsModalProps>(
  () => import('~/layouts/mentorado/helpers/SwitchModal'),
);

export const KanbanView: FC<PageTypes.Props & { member_area_id: string }> = ({
  user,
  member_area_id,
}) => {
  const { steps: stepsData, mutate } = useMemberAreaTools(member_area_id);
  const [steps, setSteps] = useState<DnDObject[]>([]);
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
      />
    );
  }, [currentModal, open, member_area_id]);

  const GetTypeName = useCallback((type) => {
    return Object.values(ToolListNames).find((i) => {
      return i.id == parseInt(type);
    }).name;
  }, []);

  const handleSave = useCallback(async () => {
    // timout para dar tempo para as imagens se organizarem
    setTimeout(async function () {
      await InputUserMemberArea(member_area_id, steps);
      mutate();
    }, 1000);
  }, [member_area_id, mutate, steps]);

  const GetOnChange = useCallback(
    async ({ refId, data }) => {
      if (data.toRemove) {
        await FilesToDelete(data.toRemove);
        delete data.toRemove;
      }
      const stepIndex = steps.findIndex((stp) => stp.id === refId + '');

      if (stepIndex >= 0) {
        setSteps((oldSteps) => {
          Object.assign(oldSteps[stepIndex], data);
          return [...oldSteps];
        });
      } else {
        setSteps((oldSteps) => {
          Object.assign(
            oldSteps[0].rows.find((r) => r.id === refId),
            data,
          );
          return [...oldSteps];
        });
      }
      handleSave();
    },
    [handleSave, steps],
  );

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
                    <Task
                      key={task.id}
                      onClick={() => {
                        const type = GetTypeName(task.type);
                        setOpen(true);
                        setCurrentModal({
                          onChange: GetOnChange,
                          type,
                          refId: task.id + '',
                          data: step || {},
                        });
                      }}
                    >
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
      {open && HandleModal()}
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
