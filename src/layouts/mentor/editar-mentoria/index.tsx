import { FC, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import InputField from '~/components/atoms/InputField';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Tabbar from '~/components/modules/Tabbar';
import { TabItem } from '~/components/modules/Tabbar/styles';
import { CustomAppBar } from '~/components/partials/MiniDrawer/components/CustomAppBar';
import { WrapperSupportHeader } from '~/components/partials/MiniDrawer/components/SupportHeader';
import { AddImgButton, BoxHeader, ButtonsWrapper, CustomTypograpy, Input, Steps, Task, TaskBox, WrapperContent } from './styles';

const EditarMentoria: FC = () => {
  const [tabindex, setTabindex] = useState(0);
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const InpuText = 'Tarefa 01 Lorem ipsum dolor win.';

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

        <Divider sx={{ borderColor: `${theme.palette.tertiary.light}`, marginBottom: '1.8rem' }} />
        <Steps>
          <BoxHeader>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <IconButton aria-label="menu" sx={{ ml: 0, color: `${theme.palette.tertiary.main}` }}>
                <MenuIcon />
              </IconButton>
              <Image alt='' src='/svgs/step-image.svg' width={60} height={60}></Image>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ color: `${theme.palette.text.primary}`, fontSize: '1rem', fontWeight: '700' }}>ETAPA 01</Typography>
                <Typography sx={{ color: `${theme.palette.success.main}`, fontSize: '1rem' }}>Vídeo de Apresentação</Typography>
              </Box>
            </Box>
            <Button sx={{ textTransform: 'none' }}>Editar</Button>
          </BoxHeader>
        </Steps>
        <Steps>
          <BoxHeader>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <IconButton aria-label="menu" sx={{ ml: 0, color: `${theme.palette.tertiary.main}` }}>
                <MenuIcon />
              </IconButton>
              <Image alt='' src='/svgs/step-image.svg' width={60} height={60}></Image>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ color: `${theme.palette.text.primary}`, fontSize: '1rem', fontWeight: '700' }}>ETAPA 02</Typography>
                <Typography sx={{ color: `${theme.palette.success.main}`, fontSize: '1rem' }}>Formulário de Perguntas</Typography>
              </Box>
            </Box>
            <Button onClick={open ? handleClose : handleOpen} sx={{ textTransform: 'none' }}>Editar</Button>
          </BoxHeader>
          <WrapperContent sx={{ display: `${open ? 'flex' : 'none'}` }}>
            <InputField label='Nome da Etapa' placeholder='Lorem ipsum dolor win'></InputField>
            <InputField label='Descrição' placeholder='Lorem ipsum dolor win'></InputField>

            <Box sx={{ display: 'flex' }}>
              <Image alt='' src='/svgs/step-image.svg' width={70} height={70}></Image>
              <Box sx={{ textAlign: 'left', color: `${theme.palette.text.primary}` }}>
                <Typography variant="body1">Imagem Principal</Typography>
                <AddImgButton>Adicionar Imagem</AddImgButton>
                <Typography sx={{ opacity: '0.4', fontSize: '0.8rem' }}>
                  Recomendação: 70x70 pixels
                </Typography>
              </Box>
            </Box>
            <TaskBox>
              <Task>
                <MenuIcon />
                <Input value='Tarefa 01 Lorem ipsum dolor win'></Input>
                <Button sx={{ textTransform: 'none', fontSize: '0.75rem' }} >Editar</Button>
              </Task>
              <Task>
                <MenuIcon />
                <Input ></Input>
                <Button sx={{ textTransform: 'none', fontSize: '0.75rem' }} >Editar</Button>
              </Task>
              <Task>
                <MenuIcon />
                <Input ></Input>
                <Button sx={{ textTransform: 'none', fontSize: '0.75rem' }} >Editar</Button>
              </Task>
              <Button sx={{ color: `${theme.palette.caption.main}`, width: '100%' }}>+ ADICIONAR TAREFA</Button>
            </TaskBox>
            <Box sx={{ display: 'flex' }}>
              <Image alt='' src='/svgs/step-image.svg' width={70} height={70}></Image>
              <Box sx={{ textAlign: 'left', color: `${theme.palette.text.primary}` }}>
                <Typography variant="body1">Imagem de Conclusão</Typography>
                <AddImgButton>Adicionar Imagem</AddImgButton>
                <Typography sx={{ opacity: '0.4', fontSize: '0.8rem' }}>
                  Recomendação: 70x70 pixels
                </Typography>
              </Box>
            </Box>
          </WrapperContent>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Divider orientation='vertical' sx={{ borderColor: `${theme.palette.caption.main}`, height: '1rem', width: '0', marginTop: '1.5rem' }} />
            <Button sx={{ color: `${theme.palette.caption.main}`}}>+ ADICIONAR ETAPA</Button>
          </Box>
        </Steps>
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
