import Image from 'next/image';
import { FC, useCallback, useEffect, useState } from 'react';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { GroupTools } from '~/components/modules/DragNDrop';
import HorizontalProgressBar from '~/components/modules/HorizontalProgressBar';
import TipBar from '~/components/modules/TipBar';
import Toolbar from '~/components/modules/Toolbar';
import { GetAuthSession } from '~/helpers/AuthSession';
import { OrganizeTools } from '~/helpers/OrganizeTools';
import { useMemberAreaTools } from '~/hooks/useMemberAreaTools';
import { useUserInputs } from '~/hooks/useUserInputs';
import { GetProduct } from '~/services/product.service';
import HandleToolModal from '../helpers/HandleToolModal';
import SaveClientInput, { GetTypeName } from '../helpers/SaveClientInput';
import {
  Bundle,
  BundleMonth,
  BundleTitle,
  ImageWrapper,
  ScrollArea,
  Task,
  TasksWrapper,
  TasktTitle,
} from './styles';

const ContinuosMentoring: FC<
  PageTypes.Props & { member_area_id: string; memberArea: any; task_id: string }
> = ({ member_area_id, memberArea, task_id }) => {
  const { steps: stepsData, mutate } = useMemberAreaTools(member_area_id);
  const { inputs: inputData } = useUserInputs(member_area_id);
  const [steps, setSteps] = useState<GroupTools[]>([]);
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
  const mock = [
    {
      id: 0,
      title: 'Madrugada',
      rows: [
        {
          id: 0,
          title: 'Aula 01',
        },
        {
          id: 0,
          title: 'Aula 02',
        },
        {
          id: 0,
          title: 'Aula 03',
        },
        {
          id: 0,
          title: 'Aula 04',
        },
      ],
    },
  ];
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
        <HorizontalProgressBar
          data={steps}
          input={userInput}
          activeid={task_id}
          onGoTo={() => {}}
        />
        <ScrollArea>
          {steps &&
            steps.map((step) => (
              <Bundle key={step.id}>
                <ImageWrapper>
                  {step?.extra && step?.extra[0]?.sourceUrl && (
                    <Image
                      alt="imagem"
                      width={50}
                      height={50}
                      src={step?.extra[0]?.sourceUrl}
                      style={{
                        objectFit: 'contain',
                        alignSelf: 'center',
                      }}
                    />
                  )}
                  <BundleTitle>{step.title}</BundleTitle>
                  <BundleMonth>{step.description}</BundleMonth>
                </ImageWrapper>

                <TasksWrapper>
                  {(!step.rows || step.rows.length == 0) && (
                    <TipBar>
                      Ainda não há <span>nenhuma atividade disponível</span>{' '}
                      para essa etapa. Aguarde novas atualizações.
                    </TipBar>
                  )}
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
                      <TasktTitle>{task.title}</TasktTitle>
                      <Image
                        alt="imagem"
                        width={15}
                        height={15}
                        src="/svgs/done.svg"
                      />
                    </Task>
                  ))}
                </TasksWrapper>
              </Bundle>
            ))}
        </ScrollArea>
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
  const task_id = (ctx.query.task_id || 0) as string;

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
      task_id,
      memberArea: {
        id: memberArea.id,
        title: memberArea.title,
        description: memberArea.description,
      },
    },
  };
};

export default ContinuosMentoring;
