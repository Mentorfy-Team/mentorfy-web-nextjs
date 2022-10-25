import Box from '@mui/material/Box';
import Image from 'next/image';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { CloseButton, Description } from './styles';

type InputProps = { id: string; value: boolean }[];
type ExtraProps = boolean;

type ToolData = {
  id: string;
  title: string;
};

const OpenText = ({
  open,
  setOpen,
  data: { data: taskData, title: titleData, description: descriptionData },
  onChange,
  userInput,
}: MentoredComponents.Props<ToolData[], InputProps, ExtraProps>) => {
  const handleFinish = () => {
    onChange({ data: {}, extra: {
      finished: true
    } });
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
        <Description>{descriptionData}</Description>

        <Box>{/* // TODO: show txt */}</Box>
        <CloseButton onClick={handleFinish}>Fechar</CloseButton>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default OpenText;
