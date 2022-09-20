import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import InputField from '~/components/atoms/InputField';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import EditMembersAreaSteps from '~/components/modules/EditMembersAreaSteps';
import Tabbar from '~/components/modules/Tabbar';
import { TabItem } from '~/components/modules/Tabbar/styles';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
import { PublicRoutes } from '~/consts';
import { GetProfile } from '~/services/profile.service';
import AddImage from '../../components/AddImage';
import TaskBox from '../../components/TaskBox';
import {
  ButtonsWrapper,
  CustomTypograpy,
} from './styles';

const EditarMentoria: FC = () => {
  const [tabindex, setTabindex] = useState(0);
  const theme = useTheme();

  const Header = <Typography>Nova Mentoria 4S</Typography>;
  const Title = 'ETAPA 01';
  const StepType = 'Vídeo de apresentação';
  const Image = '/svgs/step-image.svg';

  const SupportHeader = (
    <Tabbar selected={tabindex} onChange={(_, value) => setTabindex(value)}>
      <TabItem label="Jornada do Cliente" />
      <TabItem label="Configurações" />
    </Tabbar>
  );

  return (
    <PageWrapper>
      <MiniDrawer header={Header} supportHeader={SupportHeader}>
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
            Construa abaixo as etapas/tarefas que seus membros irão percorer.
            Você poderá adicionar, remover ou alterar posteriormente. Você
            também pode mover de ordem as etapas e tarefas.
          </CustomTypograpy>
          <Divider
            sx={{
              borderColor: `${theme.palette.tertiary.light}`,
              marginBottom: '1.8rem',
            }}
          />
          <EditMembersAreaSteps title={Title} stepType={StepType} image={Image}>
            <Box>
              <InputField label='Nome da etapa' />
              <InputField label='Descrição' />
              <AddImage/>
              <TaskBox/>
            </Box>
          </EditMembersAreaSteps>
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
            <Button sx={{ color: `${theme.palette.caption.main}` }}>
              + ADICIONAR ETAPA
            </Button>
          </Box>
        </ContentWidthLimit>
      </MiniDrawer>
    </PageWrapper>
  );
};

export async function getProps() {
  return {
    props: {},
  };
}

export default EditarMentoria;
