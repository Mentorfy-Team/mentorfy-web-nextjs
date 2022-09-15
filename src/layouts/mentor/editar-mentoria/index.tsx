import { FC, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Tabbar from '~/components/modules/Tabbar';
import { TabItem } from '~/components/modules/Tabbar/styles';
import { CustomAppBar } from '~/components/partials/MiniDrawer/components/CustomAppBar';
import { WrapperSupportHeader } from '~/components/partials/MiniDrawer/components/SupportHeader';
import { BoxHeader, ButtonsWrapper, CustomTypograpy, StepOne } from './styles';

const EditarMentoria: FC = () => {
  const [tabindex, setTabindex] = useState(0);

  const SupportHeader = (
    <Tabbar selected={tabindex} onChange={(_, value) => setTabindex(value)}>
      <TabItem label="Jornada do Cliente" />
      <TabItem label="Configurações" />
    </Tabbar>
  );

  return (
    <>
      <CustomAppBar id="AppBar">
        <Typography variant="h6" color="white" noWrap component="p">
          Nova Mentoria 4S
        </Typography>
        {SupportHeader && (
          <WrapperSupportHeader>{SupportHeader}</WrapperSupportHeader>
        )}
      </CustomAppBar>

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

        <Divider sx={{ borderColor: '#9F9F9F' }} />
        <StepOne>
          <BoxHeader>
            <IconButton aria-label="menu" color="inherit" sx={{ ml: 0 }}>
              <MenuIcon />
            </IconButton>
          </BoxHeader>
        </StepOne>
      </ContentWidthLimit>
    </>
  );
};

export async function getProps() {
  return {
    props: {},
  };
}
export default EditarMentoria;
