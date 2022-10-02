import { FC, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { ToolListNames } from '~/layouts/mentor/area-de-membros/helpers/SwitchModal';
import { BoxHeader, Step, WrapperContent } from './styles';

type props = {
  children?: JSX.Element;
  image?: string;
  title?: JSX.Element | string;
  stepType?: JSX.Element | string;
};
const EditMembersAreaSteps: FC<props> = ({
  children,
  image,
  title,
  stepType,
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const typeToScreen = (typeTool: number) => {
    switch (typeTool) {
      case ToolListNames.QuestionsForm.id:
        return ToolListNames.QuestionsForm.name;
      case ToolListNames.Video.id:
        return ToolListNames.Video.name;
      case ToolListNames.Checklist.id:
        return ToolListNames.Checklist.name;
      case ToolListNames.Embed.id:
        return ToolListNames.Embed.name;
      case ToolListNames.OpenText.id:
        return ToolListNames.OpenText.name;
      case ToolListNames.UploadFile.id:
        return ToolListNames.UploadFile.name;
      case ToolListNames.WheelOfLifeModal.id:
        return ToolListNames.WheelOfLifeModal.name;
      default:
        return 'Tipo não encontrado';
    }
  };

  return (
    <Step>
      <BoxHeader>
        <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <MenuIcon
            sx={{
              color: `${theme.palette.tertiary.main}`,
              cursor: 'pointer',
              marginBottom: '0.5rem',
            }}
          />
          <Image alt="" src={image} width={50} height={50}></Image>
          <Box sx={{ textAlign: 'left' }}>
            <Typography
              sx={{
                color: `${theme.palette.text.primary}`,
                fontSize: '1rem',
                fontWeight: '700',
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                color: `${theme.palette.success.main}`,
                fontSize: '1rem',
              }}
            >
              {typeToScreen(parseInt(stepType as string))}
            </Typography>
          </Box>
        </Box>
        <Button
          onClick={(e) => {
            open ? handleClose() : handleOpen();
          }}
          sx={{ textTransform: 'none', marginBottom: '0.2rem' }}
        >
          Editar
        </Button>
      </BoxHeader>
      <WrapperContent sx={{ display: `${open ? 'flex' : 'none'}` }}>
        {children}
      </WrapperContent>
    </Step>
  );
};

export default EditMembersAreaSteps;
