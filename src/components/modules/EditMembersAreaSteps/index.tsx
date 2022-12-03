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
  stepType?: JSX.Element | string | number;
  onEdit?: (id) => void;
  step: any;
  isHeader?: boolean;
  productType?: boolean;
};
const EditMembersAreaSteps: FC<props> = ({
  image,
  title,
  stepType,
  onEdit,
  step,
  isHeader = false,
  productType,
}) => {
  const theme = useTheme();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: step.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const typeToScreen = (typeTool: number) => {
    const name = productType ? 'Agrupador de Módulo' : 'Agrupador de Etapa';
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
      case 0:
        return name;
      default:
        return 'Tipo não encontrado';
    }
  };

  return (
    <div
      id={step.id + ''}
      key={step.id}
      ref={setNodeRef}
      style={{ ...style, margin: !isHeader ? '8px' : 'unset' }}
      {...attributes}
    >
      <Step
        sx={{
          borderRadious: isHeader ? '0px' : '1.2rem 1.2rem 0 0',
        }}
      >
        <BoxHeader>
          <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {!isHeader && (
              <MenuIcon
                sx={{
                  color: `${theme.palette.tertiary.main}`,
                  cursor: 'pointer',
                  marginBottom: '0.5rem',
                  margin: '0.2rem',
                }}
                {...listeners}
              />
            )}
            {isHeader && image && (
              <Image
                alt=""
                src={image}
                style={{
                  paddingBottom: '0.6rem',
                  objectFit: 'contain',
                }}
                width={50}
                height={50}
              ></Image>
            )}
            <Box sx={{ textAlign: 'left' }}>
              <Typography
                sx={{
                  color: `${theme.palette.text.primary}`,
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  lineHeight: '1.1rem',
                }}
              >
                {title}
              </Typography>
              <Typography
                sx={{
                  color: `${theme.palette.success.main}`,
                  fontSize: '0.9rem',
                  lineHeight: '1.5rem',
                }}
              >
                {typeToScreen(parseInt(stepType as string))}
              </Typography>
            </Box>
          </Box>
          <Button
            onClick={() => onEdit(step)}
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
