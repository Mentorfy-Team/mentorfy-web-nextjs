import { useState } from 'react';
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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState([]);
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
        {console.log('input', input)}
        <Box sx={{ textAlign: 'center', marginTop: '3rem' }}>
          <Question>
            <InputField
              label={taskData[currentQuestion].data}
              value={input ? input[currentQuestion]?.value : ''}
              onChange={(e) =>
                setInput((old) => {
                  const input = old.find((item) => item.id === currentQuestion);
                  if (input) {
                    input.value = e.target.value;
                    return [...old];
                  }
                  return [
                    ...old,
                    { id: currentQuestion, value: e.target.value },
                  ];
                })
              }
              sx={{ width: '100%' }}
            />
          </Question>
        </Box>

        <ButtonsWrapper>
          <BackButton
            disabled={currentQuestion <= 0}
            variant="contained"
            onClick={() => setCurrentQuestion((q) => q - 1)}
          >
            Anterior
          </BackButton>
          <ForwardButton
            disabled={currentQuestion === taskData.length - 1}
            variant="contained"
            onClick={() => setCurrentQuestion((q) => q + 1)}
          >
            Próximo
          </ForwardButton>
        </ButtonsWrapper>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default QuestionsForm;
