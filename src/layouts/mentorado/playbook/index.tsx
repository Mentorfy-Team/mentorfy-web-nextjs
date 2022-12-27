import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { GroupTools } from '~/components/modules/DragNDrop';
import { useMemberAreaTools } from '~/hooks/useMemberAreaTools';
import {
  Banner,
  Content,
  DescriptionText,
  SideBar,
  SideBarTitle,
  Tips,
  Wrapper,
} from './styles';
import { GetAuthSession } from '~/helpers/AuthSession';
import HandleToolModal from '../helpers/HandleToolModal';
import { GetTypeName } from '../helpers/SaveClientInput';
import Toolbar from '~/components/modules/Toolbar';
import { ProgressBarWrapper } from '../video-view/styles';
import ProgressBar from '~/components/modules/ProgressBar';
import TipBar from '~/components/modules/TipBar';
import NextImage from 'next/image';
import { SupabaseServer } from '~/backend/supabase';
import { GetProductById } from '~/backend/repositories/product/GetProductById';

export const Playbook: FC<
  PageTypes.Props & { member_area_id: string; memberArea: any }
> = ({ member_area_id, memberArea }) => {
  const { steps: stepsData, mutate } = useMemberAreaTools(member_area_id);
  const [steps, setSteps] = useState<GroupTools[]>([]);
  const [open, setOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState<string | null>();
  const [selected, setSelected] = useState<{
    categoryId: string;
    stepId: string;
  } | null>();

  const [currentModal, setCurrentModal] = useState<{
    onChange: any;
    type: string;
    refId?: string;
    area_id?: string;
    data?: any;
  }>();

  useEffect(() => {
    if (stepsData) setSteps(JSON.parse(JSON.stringify(stepsData)));
  }, [stepsData]);

  const ModalComponent = useCallback(() => {
    return HandleToolModal({
      open,
      setOpen,
      currentModal,
      area_id: member_area_id,
      inputs: [],
    });
  }, [open, currentModal, member_area_id]);

  const onSelectedCard = useCallback((id) => {
    //setCurrentCard(id);
  }, []);

  const isEmptyMentory = useMemo(() => {
    return steps?.length === 0;
  }, [steps]);

  const Cards = useCallback(() => {
    return (
      steps
        .find((s) => s.id == selected?.stepId || !selected)
        ?.rows.find((s) => s.id == selected?.categoryId || !selected)?.rows ||
      []
    );
  }, [selected, steps]);

  return (
    <>
      <Toolbar
        initialTab={1}
        breadcrumbs={['Minhas mentorias', memberArea.title]}
        contact={memberArea?.contact}
      />
      <ContentWidthLimit maxWidth={1900}>
        {isEmptyMentory && (
          <TipBar>
            Ainda não há <span>nenhuma etapa ou atividades disponíveis</span>{' '}
            para essa mentoria. Em caso de dúvidas, entre em contato com o
            suporte da mentoria.
          </TipBar>
        )}
        <Wrapper>
          <SideBar>
            <SideBarTitle>{memberArea.title}</SideBarTitle>
            <ProgressBarWrapper>
              <ProgressBar
                data={steps}
                input={[]}
                activeid={currentCard}
                activeStepId={selected?.stepId}
                onGoTo={(categoryId, step) =>
                  setSelected({ categoryId, stepId: step.id })
                }
              />
            </ProgressBarWrapper>
          </SideBar>
          <Box>
            {memberArea.extra_image ? (
              <NextImage
                alt="banner"
                src={memberArea.extra_image}
                width={1000}
                height={200}
                style={{
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Banner />
            )}

            {steps.length > 0 && (
              <Tips>
                {Cards().map((task) => (
                  <Content
                    key={task.id}
                    onClick={() => {
                      const type = GetTypeName(task.type);
                      setOpen(true);
                      setCurrentModal({
                        onChange: () => {},
                        type,
                        refId: task.id + '',
                        data: task || {},
                      });
                    }}
                  >
                    <Typography variant="h6">{task.title}</Typography>
                    <DescriptionText>{task.description}</DescriptionText>
                  </Content>
                ))}
              </Tips>
            )}
            {Cards().length === 0 && (
              <TipBar>
                Ainda não há <span>nenhuma atividade disponível</span> para essa
                etapa. Em caso de dúvidas, entre em contato com o suporte da
                mentoria.
              </TipBar>
            )}
          </Box>
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

  const supabase = SupabaseServer(ctx.req, ctx.res);
  const product = await GetProductById(supabase, {
    id: ctx.query.id,
  });

  if (!product) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      member_area_id: id,
      memberArea: {
        id: product.id,
        title: product.title,
        description: product.description,
        extra_image: product.extra_image,
      },
    },
  };
};

export default Playbook;
