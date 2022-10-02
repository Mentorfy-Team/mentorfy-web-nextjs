import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { ToolListNames } from '~/layouts/mentor/area-de-membros/helpers/SwitchModal';
import { BoxHeader, Step } from './styles';
type props = {
  children?: JSX.Element;
  image?: string;
  title?: JSX.Element | string;
  stepType?: JSX.Element | string;
  onEdit?: () => void;
  id?: number;
};
const EditMembersAreaSteps: FC<props> = ({
  image,
  title,
  stepType,
  onEdit,
  id,
}) => {
  const theme = useTheme();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
    <div id={id + ''} key={id} ref={setNodeRef} style={style} {...attributes}>
      <Step>
        <BoxHeader>
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <MenuIcon
              sx={{
                color: `${theme.palette.tertiary.main}`,
                cursor: 'pointer',
                marginBottom: '0.5rem',
              }}
              {...listeners}
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
            onClick={() => onEdit()}
            sx={{ textTransform: 'none', marginBottom: '0.2rem' }}
          >
            Editar
          </Button>
        </BoxHeader>
      </Step>
    </div>
  );
};

export default EditMembersAreaSteps;
