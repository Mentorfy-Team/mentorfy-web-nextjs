import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { GroupTools } from '~/components/modules/DragNDrop';
import { useMemberAreaTools } from '~/hooks/useMemberAreaTools';
//import { FilesToDelete } from '~/services/file-upload.service';
import { useUserInputs } from '~/hooks/useUserInputs';
import SaveClientInput, { GetTypeName } from '../helpers/SaveClientInput';
import HandleToolModal from '../helpers/HandleToolModal';

export type UserInput = {
  id?: string;
  tool_id: string;
  data: any;
  extra?: any;
};
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { GetAuthSession } from '~/helpers/AuthSession';
import {
  Bundle,
  BundleDescription,
  BundleTitle,
  ImageWrapper,
  ScrollArea,
  Task,
  TasksWrapper,
  TasktTitle,
} from './styles';
import TipBar from '~/components/modules/TipBar';
import HorizontalProgressBar from '~/components/modules/HorizontalProgressBar';
import { SupabaseServer } from '~/backend/supabase';
import { GetProductById } from '~/backend/repositories/product/GetProductById';
import { GetProfileById } from '~/backend/repositories/user/GetProfileById';
import CertificateModal from '../components/certificate-modal';
import { DocumentScanner } from '@mui/icons-material';
import { getProgressByStep } from '../helpers/GetProgress';
import { useGetProduct } from '~/hooks/useGetProduct';

const VerticalKanban: FC<
  PageTypes.Props & {
    member_area_id: string;
    memberAreaInitial: any;
    task_id: string;
    product: ProductTypes.Product;
    user: UserTypes.ProfileWithAddress & UserTypes.User;
  }
> = ({ member_area_id, memberAreaInitial, task_id, product, user }) => {
  const { steps: stepsData, mutate } = useMemberAreaTools(member_area_id);
  const [stepId, setStepId] = useState<string>();
  const { product: memberArea } = useGetProduct(
    member_area_id,
    memberAreaInitial,
  );
  const { inputs: inputData } = useUserInputs(member_area_id);
  const [steps, setSteps] = useState<GroupTools[]>([]);
  const [userInput, setUserInput] = useState<
    Partial<MemberAreaTypes.UserInput[]>
  >([]);
  const [open, setOpen] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

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

  const ActiveStepId = useMemo(() => {
    // return the first step id that has a task that is not completed
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

        if (doneTasks?.length != tasks?.length) {
          unlocked.push(steps[i].id);
          break;
        }
      }
    }
    return unlocked[unlocked.length - 1];
  }, [steps, userInput]);

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

  const isDone = useMemo(() => {
    if (!userInput || userInput.length == 0) return false;
    return steps.every((step) => getProgressByStep(step, userInput) == 100);
  }, [steps, userInput]);

  return (
    <>
      <Toolbar
        initialTab={1}
        breadcrumbs={['Minhas mentorias', memberArea?.title]}
        contact={memberArea?.contact}
        actionClick={() => setShowCertificate(true)}
        actionTitle="Ver Certificado"
        actionIcon={<DocumentScanner fontSize="small" />}
        actionVisible={isDone || false}
      />
      <HorizontalProgressBar
        data={steps}
        input={userInput}
        activeid={task_id}
        activeStepId={ActiveStepId}
        onGoTo={() => {}}
      />
      <ContentWidthLimit maxWidth={900}>
        {(!steps || steps.length == 0) && (
          <TipBar>
            Ainda n??o h?? <span>nenhuma etapa dispon??vel</span> para essa
            mentoria. Em caso de d??vidas, entre em contato com o suporte da
            mentoria.
          </TipBar>
        )}
        <ScrollArea>
          {steps &&
            steps
              .filter(({ id }) => unlockedStep.some((s) => s == id))
              .map((step) => (
                <Bundle key={step.id}>
                  <ImageWrapper>
                    {step?.data && step?.data[0]?.sourceUrl && (
                      <Image
                        alt="imagem"
                        width={50}
                        height={50}
                        src={step?.data[0]?.sourceUrl}
                        style={{
                          objectFit: 'contain',
                          marginBottom: '0.5rem',
                          alignSelf: 'center',
                        }}
                      />
                    )}
                    <BundleTitle>{step.title}</BundleTitle>
                    <BundleDescription>{step.description}</BundleDescription>
                  </ImageWrapper>

                  <TasksWrapper>
                    {(!step.rows || step.rows.length == 0) && (
                      <TipBar>
                        Ainda n??o h?? <span>nenhuma atividade dispon??vel</span>{' '}
                        para essa etapa. Aguarde novas atualiza????es.
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
                        <TasktTitle>{task.title}</TasktTitle>
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
                  </TasksWrapper>
                </Bundle>
              ))}
        </ScrollArea>
      </ContentWidthLimit>
      {open && ModalComponent()}
      {showCertificate && (
        <CertificateModal
          open={showCertificate}
          setOpen={setShowCertificate}
          product={product}
          profile={user.profile}
        />
      )}
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

  const task_id = (ctx.query.task_id || 0) as string;

  const supabase = SupabaseServer(ctx.req, ctx.res);
  const product = await GetProductById(supabase, {
    id: ctx.query.id,
  });

  if (!product) {
    return {
      notFound: true,
    };
  }

  const userData = await GetProfileById(supabase, {
    id: session.user.id,
  });

  return {
    props: {
      member_area_id: id,
      task_id,
      memberAreaInitial: {
        id: id,
        title: product?.title,
        description: product?.description,
      },
      product: product,
      user: userData,
    },
  };
};

export default VerticalKanban;
