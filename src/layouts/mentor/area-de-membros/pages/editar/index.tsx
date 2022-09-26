import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import InputField from '~/components/atoms/InputField';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import EditMembersAreaSteps from '~/components/modules/EditMembersAreaSteps';
//import ModalComponent from '~/components/modules/Modal';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import { GetProfile } from '~/services/profile.service';
import AddImage from '../../components/AddImage';
import FilesModal from '../../components/FilesModal';
import TaskBox from '../../components/TaskBox';
//import VideoModal from '../../components/VideoModal';
import { ButtonsWrapper, CustomTypograpy, ScrollWrapper } from './styles';
import dynamic from 'next/dynamic';
import { DnDObject } from '~/components/modules/DragNDrop';
const DragNDrop = dynamic(() => import('~/components/modules/DragNDrop'), {
  ssr: false,
});

const EditarMentoria: FC = () => {
  const [tabindex, setTabindex] = useState(0);
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState<DnDObject[]>([
    {
      id: 0,
      rows: []
    }
  ]);

  const theme = useTheme();

  const Image = '/svgs/step-image.svg';

  const addNewStep = () => {
    const newStep = 
        {
          id: Math.random(),
          title: 'ETAPA '+ (steps[0].rows.length +1),
          description: 'Vídeo de apresentação',
          type: 'Vídeo de apresentação',
          data: '',
        };

    setSteps(oldSteps=> {
      oldSteps[0].rows.push(newStep);
      return [...oldSteps];
    });
  };

  const hadleOpenModal = () => {
    setOpen(true);
  };

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
          <Button
            variant="contained"
            sx={{ width: '12.5rem', height: '2.5rem', textTransform: 'none' }}
          >
            Salvar
          </Button>
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
        <ScrollWrapper withtoolbar='true'>
        <DragNDrop model={(element_id)=>{
          const stp = steps[0].rows.find((stp)=> stp.id == element_id);
          return (
          <EditMembersAreaSteps
          title={stp.title}
          stepType={stp.type}
          image={Image}
        >
          <Box>
            <InputField label="Nome da etapa" />
            <InputField label="Descrição" />
            <AddImage />
            <TaskBox />
          </Box>
        </EditMembersAreaSteps>
        )}} elements={steps} />
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
            onClick={addNewStep}
            sx={{ color: `${theme.palette.caption.main}` }}
          >
            + ADICIONAR ETAPA
          </Button>
          {/* <FilesModal /> */}
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
