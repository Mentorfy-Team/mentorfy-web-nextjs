import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { GroupTools } from '~/components/modules/DragNDrop';
import Toolbar from '~/components/modules/Toolbar';
import { useMemberAreaTools } from '~/hooks/useMemberAreaTools';
//import { FilesToDelete } from '~/services/file-upload.service';
import { useUserInputs } from '~/hooks/useUserInputs';
import { Description, Step, Task, TasktTitle, Title, Wrapper } from './styles';
import SaveClientInput, { GetTypeName } from '../helpers/SaveClientInput';
import HandleToolModal from '../helpers/HandleToolModal';
import TipBar from '~/components/modules/TipBar';
import { useGetProduct } from '~/hooks/useGetProduct';
import { GetAuthSession } from '~/helpers/AuthSession';
import { GetProduct } from '~/services/product.service';
import { GetProfile } from '~/services/profile.service';

export type UserInput = {
  id?: string;
  tool_id: string;
  data: any;
  extra?: any;
};

export const KanbanView: FC<
  PageTypes.Props & {
    member_area_id: string;
    memberAreaInitial: any;
    error;
    product: ProductTypes.Product;
    user: UserTypes.ProfileWithAddress & UserTypes.User;
  }
> = ({ member_area_id, memberAreaInitial, error, product, user }) => {
  const { product: memberArea } = useGetProduct(
    member_area_id,
    memberAreaInitial,
  );
  const { steps: stepsData, mutate } = useMemberAreaTools(member_area_id);
  const { inputs: inputData } = useUserInputs(member_area_id);
  const [steps, setSteps] = useState<GroupTools[]>([]);
  const [userInput, setUserInput] = useState<
    Partial<MemberAreaTypes.UserInput[]>
  >([]);
  const [open, setOpen] = useState(false);
  const [showCertificate, setShowCertificate] = useState(true);

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
    if (stepsData) setSteps(JSON.parse(JSON.stringify(stepsData)));
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

  const getProgress = (ids) => {
    let progress = 0;
    ids.forEach((id) => {
      const inputDone = userInput.find((i) => i.member_area_tool_id === id);
      if (inputDone) progress++;
    });
    return ids.length > 0 ? (progress / ids.length) * 100 : 0;
  };

  const getProgressByStep = (step: GroupTools) => {
    const ids = step.rows.map((r) => r.id);
    return getProgress(ids);
  };

  const isDone = steps.every((step) => getProgressByStep(step) == 100);

  return (
    <>
      <Toolbar
        initialTab={1}
        breadcrumbs={['Minhas mentorias', memberArea?.title]}
        contact={memberArea?.contact}
      />
      <ContentWidthLimit>
        {(!steps || steps.length == 0) && (
          <TipBar>
            Ainda não há <span>nenhuma etapa disponível</span> para essa
            mentoria. Em caso de dúvidas, entre em contato com o suporte da
            mentoria.
          </TipBar>
        )}
        <Wrapper>
          {steps &&
            steps
              .filter(({ id }) => unlockedStep.some((s) => s == id))
              .map((step) => (
                <Step key={step.id}>
                  {step?.data && step?.data[0]?.sourceUrl && (
                    <Image
                      alt="imagem"
                      width={50}
                      height={50}
                      src={step?.data[0]?.sourceUrl}
                      style={{
                        objectFit: 'contain',
                        marginBottom: '0.5rem',
                      }}
                    />
                  )}
                  <Title mt={step?.data && step?.data[0]?.sourceUrl ? 0 : 4}>
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
                          (inp) =>
                            inp.member_area_tool_id.toString() === task.id,
                        ) !== -1,
                    ).length === step.rows.length &&
                      step.rows.length > 0 && (
                        <Image
                          alt="imagem"
                          width={200}
                          height={120}
                          src={
                            (step.extra as any)?.length > 1
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
      {/* {isDone && (
        <CertificateModal
          open={showCertificate}
          setOpen={setShowCertificate}
          product={product}
          certificate={product?.certificate as any}
          user={user}
        />
      )} */}
    </>
  );
};

// * ServerSideRender (SSR)
export const getProps = async (ctx) => {
  const { session } = await GetAuthSession(ctx);
  let id = ctx.query.id as string;

  if (id.includes('pdf')) id = null;

  if (!session || !id)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  // fetch for member area
  const response: any = await GetProduct(ctx.req, id);
  let user = {};
  try {
    user = await GetProfile(ctx.req, false, session.user.id);
  } catch (error) {
    //
  }

  if (!response) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      member_area_id: id,
      memberAreaInitial: {
        id: id,
        title: response?.title,
        description: response?.description,
      },
      product: response,
      user: user,
      error: null,
    },
  };
};

export default KanbanView;
