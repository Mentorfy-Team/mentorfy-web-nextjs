import Box from '@mui/material/Box';
import Image from 'next/image';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import {
  BackButton,
  ButtonsWrapper,
  Description,
  ForwardButton,
  Question,
} from './styles';

const QuestionsForm = ({
  open,
  setOpen,
  data: { data: taskData, title: titleData, description: descriptionData },
  onChange,
  userInput,
}) => {
  const HeadText = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Image
        alt="perguntas"
        src="/svgs/questions-forms-icon.svg"
        height={20}
        width={18}
      />
      <>{titleData}</>
    </Box>
  );
  return (
    <ModalComponent open={open} setOpen={setOpen} title={HeadText} isMentorado>
      <ModalDialogContent isMentorado sx={{ width: '680px' }}>
        <Description>{descriptionData}</Description>

        <Box sx={{ textAlign: 'center', marginTop: '3rem' }}>
          <Question>
            5 - Qual o nome do seu 3º pet adotado pela sua família?
          </Question>

          <InputField />
        </Box>

        <ButtonsWrapper>
          <BackButton variant="contained">Anterior</BackButton>
          <ForwardButton variant="contained">Próximo</ForwardButton>
        </ButtonsWrapper>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default QuestionsForm;
