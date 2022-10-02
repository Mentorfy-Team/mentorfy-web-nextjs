import { FC, useCallback, useState } from 'react';
import Save from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import dynamic from 'next/dynamic';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { DnDObject } from '~/components/modules/DragNDrop';
import EditMembersAreaSteps from '~/components/modules/EditMembersAreaSteps';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import { GetProfile } from '~/services/profile.service';
import { ToolListNames, ToolsModalProps } from '../../helpers/SwitchModal';
import {
  ButtonsWrapper,
  CustomTypograpy,
  SaveButton,
  ScrollWrapper,
} from './styles';
const DragNDrop = dynamic(() => import('~/components/modules/DragNDrop'), {
  ssr: false,
});

const SwitchModal = dynamic<ToolsModalProps>(
  () => import('../../helpers/SwitchModal'),
);

const EditarMentoria: FC = () => {
  const [tabindex, setTabindex] = useState(0);
  const [currentModal, setCurrentModal] = useState<{
    onChange: any;
    type: string;
  }>();
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState<DnDObject[]>([
    {
      id: 0,
      rows: [],
    },
  ]);

  const theme = useTheme();

  const Image = '/svgs/step-image.svg';

  const addNewStep = useCallback((title, description, type) => {
    const newStep = {
      id: Math.random(),
      title: title,
      description,
      type,
    };

    setSteps((oldSteps) => {
      oldSteps[0].rows.push(newStep);
      return [...oldSteps];
    });
  }, []);

  const hadleOpenToolsModal = useCallback(() => {
    setCurrentModal({
      onChange: (tool: MentorTools.Tool) => {
        addNewStep(
          `Etapa ${steps[0].rows.length + 1}`,
          tool.description,
          tool.id,
        );
      },
      type: ToolListNames.ToolList.name,
    });
    setOpen(true);
  }, [addNewStep, steps]);

  const HandleModal = useCallback(() => {
    return (
      <SwitchModal
        open={open}
        setOpen={setOpen}
        onChange={currentModal.onChange}
        type={currentModal.type}
      />
    );
  }, [currentModal, open]);

  return (
    <>
      <Toolbar tabs={['Etapas', 'Configuração']} />
      <ContentWidthLimit maxWidth={600}>
        <ButtonsWrapper>
          <Button
            variant="text"
            sx={{
              width: '12.5rem',
              height: '2.5rem',
              textTransform: 'none',
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            Voltar
          </Button>
          <SaveButton variant="outlined" color="primary" onClick={() => {}}>
            <Save />
            <Typography variant="body2" ml={1}>
              Salvar
            </Typography>
          </SaveButton>
        </ButtonsWrapper>

        <CustomTypograpy>
          Construa abaixo as etapas/tarefas que seus membros irão percorer. Você
          poderá adicionar, remover ou alterar posteriormente. Você também pode
          mover de ordem as etapas e tarefas.
        </CustomTypograpy>
        <Divider
          sx={{
            borderColor: `${theme.palette.tertiary.light}`,
            marginBottom: '1.8rem',
          }}
        />
        <ScrollWrapper withtoolbar="true">
          <DragNDrop
            setElements={setSteps}
            model={(element_id) => {
              const stp = steps[0].rows.find((stp) => stp.id == element_id);
              if (!stp) return null;
              return (
                <EditMembersAreaSteps
                  title={stp.title}
                  stepType={stp.type}
                  image={Image}
                  onEdit={() => {
                    console.log('edit');
                    setOpen(true);
                  }}
                  id={stp.id}
                />
              );
            }}
            elements={steps}
          />
        </ScrollWrapper>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Divider
            orientation="vertical"
            sx={{
              borderColor: `${theme.palette.caption.main}`,
              height: '1rem',
              width: '0',
              marginTop: '1.5rem',
            }}
          />
          <Button
            onClick={hadleOpenToolsModal}
            sx={{ color: `${theme.palette.caption.main}` }}
          >
            + ADICIONAR ETAPA
          </Button>
          {open && HandleModal()}
        </Box>
      </ContentWidthLimit>
    </>
  );
};

// * ServerSideRender (SSR)
export const getProps = withPageAuth({
  authRequired: true,
  redirectTo: PublicRoutes.login,
  async getServerSideProps(ctx) {
    const { profile } = await GetProfile(ctx.req);
    return {
      props: {
        profile: profile,
      },
    };
  },
});

export default EditarMentoria;
