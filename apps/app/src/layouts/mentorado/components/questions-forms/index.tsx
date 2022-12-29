import { useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import InputField from '@app/components/atoms/InputField';
import Description from '@app/components/atoms/ModalDescription';
import ModalComponent from '@app/components/modules/Modal';
import { ModalDialogContent } from '@app/components/modules/Modal/styles';
import {
  BackButton,
  ButtonsWrapper,
  ForwardButton,
  Question,
  TaskTitle,
} from './styles';
import TipBar from '@app/components/modules/TipBar';

type DataProps = { id: string; value: string }[];
type ExtraProps = boolean;

const QuestionsForm = ({
  open,
  setOpen,
  data: { data: taskData, title: titleData, description: descriptionData },
  onChange,
  userInput,
}: MentoredComponents.Props<any, DataProps, ExtraProps>) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState(userInput?.data || []);

  const handleFinish = () => {
    if (taskData)
      onChange({
        data: input,
        extra: {
          finished: taskData.length === input.length,
        },
      });
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
        {!taskData && (
          <TipBar>
            Ainda não há <span>nenhum conteúdo disponível</span> nossa etapa. Em
            caso de dúvidas, entre em contato com o suporte da mentoria.
          </TipBar>
        )}
        {taskData && <Description>{descriptionData}</Description>}
        {taskData && (
          <Question>
            <TaskTitle>
              {!!taskData &&
                !!taskData[currentQuestion] &&
                taskData[currentQuestion].data}
            </TaskTitle>
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
        )}
        {taskData && (
          <ButtonsWrapper>
            <BackButton
              disabled={currentQuestion <= 0}
              variant="contained"
              onClick={() => setCurrentQuestion((q) => q - 1)}
            >
              Anterior
            </BackButton>
            {currentQuestion !== taskData?.length - 1 && (
              <ForwardButton
                disabled={
                  !input[currentQuestion] ||
                  input[currentQuestion]?.value === ''
                }
                variant="contained"
                onClick={() => setCurrentQuestion((q) => q + 1)}
              >
                Próximo
              </ForwardButton>
            )}
            {currentQuestion === taskData?.length - 1 && (
              <ForwardButton
                disabled={
                  !taskData ||
                  !input[currentQuestion] ||
                  input[currentQuestion]?.value === ''
                }
                variant="contained"
                onClick={() => handleFinish()}
              >
                Concluir
              </ForwardButton>
            )}
          </ButtonsWrapper>
        )}
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default QuestionsForm;
