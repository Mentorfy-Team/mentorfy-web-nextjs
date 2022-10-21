import { useState } from 'react';
import { Typography } from '@mui/material';
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

type DataProps = { id: string; value: string }[];
type ExtraProps = boolean;

const QuestionsForm = ({
  open,
  setOpen,
  data: { data: taskData, title: titleData, description: descriptionData },
  onChange,
  userInput,
}: MentoredComponents.Props<DataProps, ExtraProps>) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState(userInput?.data || []);

  const handleFinish = () => {
    onChange({ data: input, finished: taskData.length === input.length });
    setOpen(false);
  };

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
            <Typography sx={{ fontWeight: 'bold' }}>
              {taskData[currentQuestion].data}
            </Typography>
            <InputField
              value={
                input && input[currentQuestion]?.value
                  ? input[currentQuestion]?.value
                  : ''
              }
              placeholder="Responda aqui..."
              onChange={(e) =>
                setInput((old) => {
                  const input = old.find(
                    (item) => item.id === currentQuestion.toString(),
                  );
                  if (input) {
                    input.value = e.target.value;
                    return [...old];
                  }
                  return [
                    ...old,
                    { id: currentQuestion.toString(), value: e.target.value },
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
          {currentQuestion !== taskData.length - 1 && (
            <ForwardButton
              disabled={
                !input[currentQuestion] || input[currentQuestion]?.value === ''
              }
              variant="contained"
              onClick={() => setCurrentQuestion((q) => q + 1)}
            >
              Próximo
            </ForwardButton>
          )}
          {currentQuestion === taskData.length - 1 && (
            <ForwardButton
              disabled={
                !input[currentQuestion] || input[currentQuestion]?.value === ''
              }
              variant="contained"
              onClick={() => handleFinish()}
            >
              Concluir
            </ForwardButton>
          )}
        </ButtonsWrapper>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default QuestionsForm;
