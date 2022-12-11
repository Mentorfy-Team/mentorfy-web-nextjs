import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import Description from '~/components/atoms/ModalDescription';
import TextRating from '~/components/atoms/Rating';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import {
  BackButton,
  ButtonsWrapper,
  ContentWrapper,
  ForwardButton,
  TextQuestion,
  WheelWrapper,
} from './styles';

import dynamic from 'next/dynamic';

const PDFDownload = dynamic(() => import('~/components/atoms/PDFDownload'), {
  ssr: false,
});

import WheelOfLifeTemplate from './template/WheelOfLifeTemplate';
import TipBar from '~/components/modules/TipBar';
import { useMediaQuery } from '@mui/material';

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
  const [finalLoading, setFinalLoading] = useState(true);
  const sizeLg = useMediaQuery('(min-width: 1200px)');
  const handleFinish = () => {
    onChange({
      data: input,
      extra: {
        finished: taskData.length === input.length,
      },
    });
    setOpen(false);
  };

  const loadResultGraph = useCallback(() => {
    if (currentArea === taskData?.length && !finalLoading) {
      return (
        <WheelWrapper>
          <WheelOfLifeTemplate
            width={sizeLg ? 680 : 350}
            height={sizeLg ? 400 : 250}
            taskData={taskData}
            input={input}
          />
        </WheelWrapper>
      );
    } else if (currentArea === taskData?.length) {
      setTimeout(() => {
        setFinalLoading(false);
      }, 1000);

      return (
        <Box
          sx={{
            display: 'grid',
            width: sizeLg ? 680 : 350,
            height: sizeLg ? 400 : 250,
            placeItems: 'center',
          }}
        >
          <CircularProgress color="success" />
        </Box>
      );
    }
  }, [currentArea, finalLoading, input, sizeLg, taskData]);

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
        {!taskData && (
          <TipBar>
            Ainda não há <span>nenhum conteúdo disponível</span> nossa etapa. Em
            caso de dúvidas, entre em contato com o suporte da mentoria.
          </TipBar>
        )}
        {taskData && (
          <div
            style={{
              backgroundColor: '#121212',
            }}
            id="wheel-id"
          >
            <Description>{descriptionData}</Description>
            <ContentWrapper>
              {currentArea !== taskData?.length && taskData && (
                <>
                  <TextQuestion>
                    De 0 a 10, como está o(a)
                    <span>
                      {' ' + !!taskData &&
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
                      setFinalLoading(true);
                      setInput((prev) => {
                        if (index === -1) {
                          return [
                            ...prev,
                            { id: taskData[currentArea].id, rating: value },
                          ];
                        } else {
                          prev[index].rating = value;
                          return [...prev];
                        }
                      });
                    }}
                    value={
                      input.find((inp) => inp.id === taskData[currentArea].id)
                        ?.rating || 0
                    }
                  />
                </>
              )}

              {loadResultGraph()}
            </ContentWrapper>
          </div>
        )}
        {/* <Heatmap
          data={generateData(
            taskData.map((task) => task.title),
            input,
          )}
        /> */}

        {taskData && (
          <ButtonsWrapper>
            <BackButton
              disabled={currentArea <= 0}
              variant="contained"
              onClick={() => setCurrentArea((q) => q - 1)}
            >
              Anterior
            </BackButton>
            {currentArea !== taskData?.length && (
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
            {currentArea === taskData?.length && !finalLoading && (
              <PDFDownload
                fileName="wheel-of-life.pdf"
                pageStyles={{}}
                loadingComponent={<CircularProgress color="success" />}
                template_id="wheel-id"
              >
                <ForwardButton variant="contained">Download</ForwardButton>
              </PDFDownload>
            )}
            {currentArea === taskData?.length && (
              <ForwardButton variant="contained" onClick={() => handleFinish()}>
                Salvar Respostas
              </ForwardButton>
            )}
          </ButtonsWrapper>
        )}
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default WheelOfLifeModal;
