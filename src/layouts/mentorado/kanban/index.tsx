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
//import { FilesToDelete } from '~/services/file-upload.service';
import { useUserInputs } from '~/hooks/useUserInputs';
import { InputUserMemberArea } from '~/services/member-area.service';
import { ToolListNames, ToolsModalProps } from '../helpers/SwitchModal';
import { Description, Step, Task, TasktTitle, Title, Wrapper } from './styles';

const SwitchMentoredModal = dynamic<ToolsModalProps>(
  () => import('~/layouts/mentorado/helpers/SwitchModal'),
);

export type UserInput = {
  id?: string;
  tool_id: string;
  data: any;
  extra?: any;
};

export const KanbanView: FC<PageTypes.Props & { member_area_id: string }> = ({
  user,
  member_area_id,
}) => {
  const { steps: stepsData, mutate } = useMemberAreaTools(member_area_id);
  const { inputs: inputData } = useUserInputs(member_area_id);
  const [steps, setSteps] = useState<DnDObject[]>([]);
  const [userInput, setUserInput] = useState<
    Partial<MemberAreaTypes.UserInput[]>
  >([]);
  const [open, setOpen] = useState(false);

  const [currentModal, setCurrentModal] = useState<{
    onChange: any;
    type: string;
    refId?: string;
    area_id?: string;
    data?: any;
  }>();

  useEffect(() => {
    if (inputData !== userInput) setUserInput(inputData);
  }, [inputData, userInput]);

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
        userInput={userInput.find(
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
        await InputUserMemberArea(tool_id, client_input);
        mutate();
      }, 1000);
    },
    [mutate],
  );

  const GetOnChange = useCallback(
    async ({ refId, data, finished }) => {
      const index = userInput.findIndex((i) => i.member_area_tool_id == refId);
      setUserInput((oldInput) => {
        if (index > -1) {
          oldInput[index].data = data;
          oldInput[index].extra = finished;
        } else {
          oldInput.push({
            member_area_tool_id: refId,
            data,
            extra: finished,
          } as any);
        }
        return [...oldInput];
      });

      handleSave({
        tool_id: refId,
        client_input: {
          data,
          id: index > -1 ? userInput[index].id : '0',
          extra: finished,
          delete: data.delete,
        },
      });
    },
    [handleSave, userInput],
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
                          data: task || {},
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
                        src={`/svgs/${
                          userInput.find(
                            (inp) => inp.member_area_tool_id === task.id,
                          )?.extra
                            ? 'done'
                            : 'done-gray'
                        }.svg`}
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
