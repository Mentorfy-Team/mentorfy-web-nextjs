import { FC, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { GroupTools } from '~/components/modules/DragNDrop';
import { OrganizeTools } from '~/helpers/OrganizeTools';
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
import { GetProduct } from '~/services/product.service';
import { ProgressBarWrapper } from '../video-view/styles';
import ProgressBar from '~/components/modules/ProgressBar';
import TipBar from '~/components/modules/TipBar';
import NextImage from 'next/image';

export const Playbook: FC<
  PageTypes.Props & { member_area_id: string; memberArea: any }
> = ({ member_area_id, memberArea }) => {
  const { steps: stepsData, mutate } = useMemberAreaTools(member_area_id);
  const [steps, setSteps] = useState<GroupTools[]>([]);
  const [open, setOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState<string | null>();

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

  return (
    <>
      <Toolbar
        initialTab={1}
        breadcrumbs={['Minhas mentorias', memberArea.title]}
      />
      <ContentWidthLimit maxWidth={1900}>
        {!steps ||
          steps.length == 0 ||
          (steps && steps.every((stp) => stp.rows.length == 0) && (
            <TipBar>
              Ainda não há <span>nenhuma etapa ou atividades disponíveis</span>{' '}
              para essa mentoria. Em caso de dúvidas, entre em contato com o
              suporte da mentoria.
            </TipBar>
          ))}
        <Wrapper>
          <SideBar>
            <SideBarTitle>{memberArea.title}</SideBarTitle>
            <ProgressBarWrapper>
              <ProgressBar
                data={steps}
                input={[]}
                activeid={currentCard}
                onGoTo={(id) => onSelectedCard(id)}
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

            <Tips>
              {steps &&
                steps
                  .find((stp) => stp.id === currentCard || !currentCard)
                  ?.rows.map((task) => (
                    <Content
                      key={task.id}
                      onClick={() => {
                        const type = GetTypeName(task.mentor_tool);
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
        extra_image: memberArea.extra_image,
      },
    },
  };
};

export default Playbook;
