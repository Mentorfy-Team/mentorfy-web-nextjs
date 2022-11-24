import { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import Description from '~/components/atoms/ModalDescription';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import {
  BackButton,
  BpCheckedIcon,
  BpIcon,
  ButtonsWrapper,
  ForwardButton,
  OptionsBox,
  OptionsText,
  OptionsWrapper,
  TaskTitle,
} from './styles';
import TipBar from '~/components/modules/TipBar';

type InputProps = { id: string; value: boolean }[];
type ExtraProps = boolean;

type ToolData = {
  id: string;
  title: string;
};

const ChecklistModal = ({
  open,
  setOpen,
  data: { data: taskData, title: titleData, description: descriptionData },
  onChange,
  userInput,
}: MentoredComponents.Props<
  (ToolData & { rows })[],
  InputProps,
  ExtraProps
>) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState(userInput?.data || []);

  const theme = useTheme();
  const [color, setColor] = useState(false);

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
        src="/svgs/checklist-icon.svg"
        height={20}
        width={18}
      />
      <>{titleData}</>
    </Box>
  );

  function BpCheckbox(props: CheckboxProps) {
    return (
      <Checkbox
        sx={{
          padding: '0',
          color: `${theme.palette.text.primary}`,
        }}
        disableRipple
        icon={<BpIcon />}
        checkedIcon={<BpCheckedIcon />}
        checked={color}
        color="default"
        onChange={(e) => (e.target.checked ? setColor(true) : setColor(false))}
        {...props}
      />
    );
  }

  return (
    <ModalComponent title={HeadText} isMentorado open={open} setOpen={setOpen}>
      <ModalDialogContent isMentorado>
        {!taskData && (
          <TipBar>
            Ainda não há <span>nenhum conteúdo disponível</span> nossa etapa. Em
            caso de dúvidas, entre em contato com o suporte da mentoria.
          </TipBar>
        )}
        {taskData && <Description>{descriptionData}</Description>}

        {taskData && (
          <OptionsWrapper>
            <TaskTitle>
              {!!taskData &&
                !!taskData[currentQuestion] &&
                taskData[currentQuestion].title}
            </TaskTitle>
            {taskData[currentQuestion].rows.map((subTask) => (
              <OptionsBox
                key={subTask.id}
                onClick={() => {
                  setColor((prev) => !prev);
                  const index = input.findIndex(
                    (item) => item.id === subTask.id,
                  );
                  if (index >= 0) {
                    setInput((old) => {
                      const newInput = [...old];
                      newInput[index] = {
                        id: subTask.id,
                        value: !old[index].value,
                      };
                      return newInput;
                    });
                  } else {
                    setInput((old) => [
                      ...old,
                      { id: subTask.id, value: true },
                    ]);
                  }
                }}
                sx={{ cursor: 'pointer' }}
              >
                <BpCheckbox
                  checked={
                    input?.find((i) => i.id === subTask.id)?.value || false
                  }
                />
                <OptionsText
                  sx={{
                    color: `${
                      input?.find((i) => i.id === subTask.id)?.value
                        ? '#7DDC51'
                        : '#E9E7E7'
                    }`,
                  }}
                >
                  {subTask.title}
                </OptionsText>
              </OptionsBox>
            ))}
          </OptionsWrapper>
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
                variant="contained"
                onClick={() => setCurrentQuestion((q) => q + 1)}
              >
                Próximo
              </ForwardButton>
            )}
            {currentQuestion === taskData?.length - 1 && (
              <ForwardButton variant="contained" onClick={() => handleFinish()}>
                Concluir
              </ForwardButton>
            )}
          </ButtonsWrapper>
        )}
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default ChecklistModal;
