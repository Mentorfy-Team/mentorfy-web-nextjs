import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import TextRating from '~/components/atoms/Rating';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import Heatmap from './Heatmap';
import { ButtonsWrapper, Description, ForwardButton, Question } from './styles';

type InputProps = { id: string; rating: number }[];
type ExtraProps = boolean;

type ToolProps = {
  id: string;
  name: string;
  checked: boolean;
};

const WheelOfLifeModal = ({
  open,
  setOpen,
  data: { data: taskData, title: titleData, description: descriptionData },
  onChange,
  userInput,
}: MentoredComponents.Props<ToolProps[], InputProps, ExtraProps>) => {
  const [input, setInput] = useState(userInput?.data || []);

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
      <ModalDialogContent isMentorado sx={{ maxWidth: '680px' }}>
        <Description>{descriptionData}</Description>
        <Box sx={{ marginTop: '3rem' }}>
          <Question
            id="container"
            sx={{ placeContent: 'center' }}
            container
            gap={4}
            mb={8}
          >
            {taskData.map((task, index) => (
              <Question xs={6} md={5} key={task.id}>
                <Typography variant="body2">{task.name}:</Typography>
                <TextRating
                  setValue={(value) => {
                    const index = input.findIndex(
                      (item) => item.id === task.id,
                    );
                    setInput((prev) => {
                      if (index === -1) {
                        return [...prev, { id: task.id, rating: value }];
                      } else {
                        prev[index].rating = value;
                        return [...prev];
                      }
                    });
                  }}
                  value={input.find((inp) => inp.id === task.id)?.rating || 0}
                />
              </Question>
            ))}
          </Question>
        </Box>
        <Heatmap
          data={generateData(
            taskData.map((task) => task.name),
            input,
          )}
        />

        <ButtonsWrapper>
          <div></div>
          <ForwardButton variant="contained" onClick={() => handleFinish()}>
            Concluir
          </ForwardButton>
        </ButtonsWrapper>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default WheelOfLifeModal;
