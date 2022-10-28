import Box from '@mui/material/Box';
import { DnDObject } from '../DragNDrop';
import {
  BundleWrapper,
  CircleProgressBar,
  CircleWrapper,
  ClassesNumber,
  Dot,
  Line,
  StepsWrapper,
  TextWrapper,
  Title,
  Wrapper,
} from './styles';

const mock = {
  title: 'Primeiros Passos',
  classesNumber: '1 de 9 aulas',
  steps: [
    {
      title: 'Aula 1',
      description: 'Introdução',
      done: true,
    },
    {
      title: 'Aula 2',
      description: 'Introdução',
      done: false,
    },
    {
      title: 'Aula 3',
      description: 'Introdução',
      done: false,
    },
  ],
};

const ProgressBar = ({
  data = [],
  input = [],
  activeid,
  onGoTo,
}: {
  data: DnDObject[];
  input: MemberAreaTypes.UserInput[];
  activeid: string;
  onGoTo: (id) => void;
}) => {
  let count = 0;

  const getIsDone = (id: string) => {
    const inputDone = input.find((i) => i.member_area_tool_id === id);
    if (inputDone) return true;
    return false;
  };

  const getProgress = (ids) => {
    let progress = 0;
    ids.forEach((id) => {
      const inputDone = input.find((i) => i.member_area_tool_id === id);
      if (inputDone) progress++;
    });
    return ids.length > 0 ? (progress / ids.length) * 100 : 0;
  };

  const getProgressByStep = (step: DnDObject) => {
    const ids = step.rows.map((r) => r.id);
    return getProgress(ids);
  };

  const getDoneByStep = (step: DnDObject) => {
    const ids = step.rows.map((r) => r.id);
    let done = 0;
    ids.forEach((id) => {
      const inputDone = input.find((i) => i.member_area_tool_id === id);
      if (inputDone) done++;
    });
    return done;
  };

  return (
    <Wrapper>
      {data.map((step, i) => (
        <div key={step.id}>
          <BundleWrapper>
            <CircleWrapper>
              <CircleProgressBar
                value={getProgressByStep(step)}
                variant="determinate"
                size={25}
                thickness={5}
              />
              {step.rows.length > 0 && (
                <>
                  <Line />
                  <Line />
                </>
              )}
            </CircleWrapper>
            <TextWrapper>
              <Title>{mock.title}</Title>
              <ClassesNumber>{`${getDoneByStep(step)} de ${
                step.rows.length
              } aula${step.rows.length > 1 ? 's' : ''}`}</ClassesNumber>
            </TextWrapper>
          </BundleWrapper>
          {step.rows.map((task, j) => {
            count++;
            return (
              <StepsWrapper key={task.id} onClick={() => onGoTo(task.id)}>
                <CircleWrapper>
                  <Line />
                  <Dot
                    className={activeid === task.id ? 'active-background' : ''}
                    sx={{
                      backgroundColor: getIsDone(task.id) ? '#38c284' : 'unset',
                    }}
                  />
                  {j + 1 !== step.rows.length ? <Line /> : <Box height={16} />}
                </CircleWrapper>
                <TextWrapper>
                  <ClassesNumber
                    className={activeid === task.id ? 'active' : ''}
                    sx={{
                      marginTop: '-0.1rem',
                    }}
                  >{`${count} - ${task.title}`}</ClassesNumber>
                </TextWrapper>
              </StepsWrapper>
            );
          })}
        </div>
      ))}
    </Wrapper>
  );
};

export default ProgressBar;