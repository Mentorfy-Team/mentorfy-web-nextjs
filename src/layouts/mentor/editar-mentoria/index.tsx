import { FC, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Tabbar from '~/components/modules/Tabbar';
import { TabItem } from '~/components/modules/Tabbar/styles';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
import { BoxHeader, ButtonsWrapper, CustomTypograpy, StepOne } from './styles';

const EditarMentoria: FC = () => {
  const [tabindex, setTabindex] = useState(0);
  const theme = useTheme();

  const Header = <Typography>Nova Mentoria 4S</Typography>;

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

          <Divider sx={{ borderColor: '#9F9F9F' }} />
          <StepOne>
            <BoxHeader>
              <IconButton aria-label="menu" color="inherit" sx={{ ml: 0 }}>
                <MenuIcon />
              </IconButton>
            </BoxHeader>
          </StepOne>
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
