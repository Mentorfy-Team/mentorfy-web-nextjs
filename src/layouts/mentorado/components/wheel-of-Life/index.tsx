import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Description from '~/components/atoms/ModalDescription';
import TextRating from '~/components/atoms/Rating';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { BackButton, ButtonsWrapper, ContentWrapper, ForwardButton, TextQuestion } from './styles';

type InputProps = { id: string; rating: number }[];
type ExtraProps = boolean;

type ToolProps = {
  id: string;
  title: string;
};

const WheelOfLifeModal = ({
  open,
  setOpen,
  data: { data: taskData, title: titleData, description: descriptionData },
  onChange,
  userInput,
}: MentoredComponents.Props<ToolProps[], InputProps, ExtraProps>) => {
  const [input, setInput] = useState(userInput?.data || []);
  const [currentArea, setCurrentArea] = useState(0);

  const generateData = useCallback((areas: string[], input: InputProps) => {
    // for each area, create a new object with the area name and the rating
    const data = [];
    for (let i = 0; i < areas.length; i++) {
      for (let j = 0; j < 10; j++) {
        data.push({
          value: input[i]?.rating > j ? 1 : 0,
          area: areas[i],
          rating: j,
        });
      }
    }
    return data;
  }, []);
  const handleFinish = () => {
    onChange({
      data: input,
      extra: {
        finished: taskData.length === input.length
      }
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
      <ModalDialogContent isMentorado sx={{ maxWidth: '680px' }}>
        <Description>{descriptionData}</Description>
        <ContentWrapper >
            {taskData && (
              <>
                <TextQuestion>
                  De 0 a 10, como está o(a)
                  <span>
                  {' ' +
                  !!taskData &&
                  !!taskData[currentArea] &&
                  taskData[currentArea].title + ' '}
                  </span>
                  na sua vida ?
                </TextQuestion>
                <TextRating
                isWheelOLife
                  setValue={(value) => {
                    const index = input.findIndex(
                      (item) => item.id === taskData[currentArea].id,
                    );
                    setInput((prev) => {
                      if (index === -1) {
                        return [...prev, { id: taskData[currentArea].id, rating: value }];
                      } else {
                        prev[index].rating = value;
                        return [...prev];
                      }
                    });
                  }}
                  value={input.find((inp) => inp.id === taskData[currentArea].id)?.rating || 0}
                />
              </>
            )}
        </ContentWrapper>
        {/* <Heatmap
          data={generateData(
            taskData.map((task) => task.title),
            input,
          )}
        /> */}

        <ButtonsWrapper>
          <BackButton
            disabled={currentArea <= 0}
            variant="contained"
            onClick={() => setCurrentArea((q) => q - 1)}
          >
            Anterior
          </BackButton>
          {currentArea !== taskData?.length - 1 && (
            <ForwardButton
              disabled={
            !input[currentArea] || input[currentArea]?.rating === 0
              }
              variant="contained"
              onClick={() => setCurrentArea((q) => q + 1)}
            >
              Próximo
            </ForwardButton>
          )}
          {currentArea === taskData?.length - 1 && (
            <ForwardButton
              disabled={
                !taskData ||
                !input[currentArea] ||
                input[currentArea]?.rating === 0
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

export default WheelOfLifeModal;
