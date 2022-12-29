import Box from '@mui/material/Box';
import Image from 'next/image';
import Description from '@app/components/atoms/ModalDescription';
import ModalComponent from '@app/components/modules/Modal';
import { ModalDialogContent } from '@app/components/modules/Modal/styles';
import TipBar from '@app/components/modules/TipBar';
import { CloseButton } from './styles';

type InputProps = { id: string; value: boolean }[];
type ExtraProps = boolean;

type ToolData = string;

const OpenText = ({
  open,
  setOpen,
  data: { data: taskData, title: titleData, description: descriptionData },
  onChange,
  userInput,
}: MentoredComponents.Props<ToolData, InputProps, ExtraProps>) => {
  const handleFinish = () => {
    if (taskData)
      onChange({
        data: {},
        extra: {
          finished: true,
        },
      });
    setOpen(false);
  };

  const HeadText = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Image
        alt="perguntas"
        src="/svgs/open-text-icon.svg"
        height={20}
        width={22}
      />
      <>{titleData}</>
    </Box>
  );
  return (
    <ModalComponent open={open} setOpen={setOpen} title={HeadText} isMentorado>
      <ModalDialogContent isMentorado>
        {!taskData && (
          <TipBar>
            Ainda não há <span>nenhum conteúdo disponível</span> nossa etapa. Em
            caso de dúvidas, entre em contato com o suporte da mentoria.
          </TipBar>
        )}
        {taskData && <Description>{descriptionData}</Description>}
        {taskData && (
          <div
            dangerouslySetInnerHTML={{
              __html: taskData,
            }}
          />
        )}

        <Box>{/* // TODO: show txt */}</Box>
        <CloseButton onClick={handleFinish}>Fechar</CloseButton>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default OpenText;
