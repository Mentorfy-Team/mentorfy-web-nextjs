import { FC, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { DnDObject } from '~/components/modules/DragNDrop';
import Toolbar from '~/components/modules/Toolbar';
import { OrganizeTools } from '~/helpers/OrganizeTools';
import { useMemberAreaTools } from '~/hooks/useMemberAreaTools';
//import { FilesToDelete } from '~/services/file-upload.service';
import { useUserInputs } from '~/hooks/useUserInputs';
import { GetProduct } from '~/services/product.service';
import { Description, Step, Task, TasktTitle, Title, Wrapper } from './styles';
import { GetAuthSession } from '~/helpers/AuthSession';
import SaveClientInput, { GetTypeName } from '../helpers/SaveClientInput';
import HandleToolModal from '../helpers/HandleToolModal';

export type UserInput = {
  id?: string;
  tool_id: string;
  data: any;
  extra?: any;
};

export const KanbanView: FC<
  PageTypes.Props & { member_area_id: string; memberArea: any }
> = ({ member_area_id, memberArea }) => {
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
    setUserInput(inputData);
  }, [inputData]);

  useEffect(() => {
    setSteps((oldSteps) => {
      oldSteps = [...OrganizeTools(stepsData)];
      return [...oldSteps];
    });
  }, [stepsData]);

  const ModalComponent = useCallback(() => {
    return HandleToolModal({
      open,
      setOpen,
      currentModal,
      area_id: member_area_id,
      inputs: inputData,
    });
  }, [open, currentModal, member_area_id, inputData]);

  const GetOnChange = useCallback(
    async ({ refId, data, extra }) => {
      const index = userInput?.findIndex((i) => i.member_area_tool_id == refId);
      SaveClientInput({
        data: { refId, data, extra, index, inputs: userInput },
        callbacks: {
          result: setUserInput,
          mutate,
        },
        member_area_id,
      });
    },
    [member_area_id, mutate, userInput],
  );

  return (
    <>
      <Toolbar breadcrumbs={['Minhas mentorias', memberArea.title]} />
      <ContentWidthLimit>
        <Wrapper>
          {steps &&
            steps.map((step) => (
              <Step key={step.id}>
                {step?.extra && step?.extra[0]?.sourceUrl && (
                  <Image
                    alt="imagem"
                    width={50}
                    height={50}
                    src={step?.extra[0]?.sourceUrl}
                    style={{
                      objectFit: 'contain',
                      marginBottom: '0.5rem',
                    }}
                  />
                )}
                <Title mt={step?.extra && step?.extra[0]?.sourceUrl ? 0 : 4}>
                  {step.title}
                </Title>
                <Box
                  sx={{
                    height: '100%',
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
                        const type = GetTypeName(task.mentor_tool);
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
                        style={{
                          marginLeft: '0.4rem',
                          alignSelf: 'center',
                        }}
                        src={`/svgs/${
                          userInput?.find(
                            (inp) => inp.member_area_tool_id === task.id,
                          )?.extra
                            ? 'done'
                            : 'done-gray'
                        }.svg`}
                      />
                    </Task>
                  ))}

                  {step.rows.filter(
                    (task) =>
                      userInput.findIndex(
                        (inp) => inp.member_area_tool_id.toString() === task.id,
                      ) !== -1,
                  ).length === step.rows.length && (
                    <Image
                      alt="imagem"
                      width={200}
                      height={120}
                      src={
                        step.extra.length > 1
                          ? step.extra[1].sourceUrl
                          : '/svgs/finished.svg'
                      }
                      style={{
                        marginTop: '1.2rem',
                        objectFit: 'contain',
                      }}
                    />
                  )}
                </Box>
              </Step>
            ))}
        </Wrapper>
      </ContentWidthLimit>
      {open && ModalComponent()}
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

  // fetch for member area
  const memberArea = await GetProduct(ctx.req, id);

  if (!memberArea) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      member_area_id: id,
      memberArea: {
        id: memberArea.id,
        title: memberArea.title,
        description: memberArea.description,
      },
    },
  };
};

export default KanbanView;
