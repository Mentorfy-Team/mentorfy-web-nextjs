import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import { GroupTools } from '../DragNDrop';
import {
  BundleWrapper,
  CircleProgressBar,
  CircleWrapper,
  ClassesNumber,
  Dot,
  Line,
  Square,
  StepsWrapper,
  TextWrapper,
  Title,
  Wrapper,
} from './styles';
import { useMemo, useState } from 'react';

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
  activeStepId,
  onGoTo,
}: {
  data: GroupTools[];
  input: MemberAreaTypes.UserInput[];
  activeid: string;
  activeStepId: string;
  onGoTo: (id: string, step?: GroupTools) => void;
}) => {
  const [collapse, setCollapse] = useState(true);
  const [stepId, setStepId] = useState<string>();
  let count = 0;

  const selectedStepId = useMemo(() => {
    return stepId || activeStepId;
  }, [activeStepId, stepId]);

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

  const getProgressByStep = (step: GroupTools) => {
    const ids = step.rows.map((r) => r.id);
    return getProgress(ids);
  };

  const getDoneByStep = (step: GroupTools) => {
    const ids = step.rows.map((r) => r.id);
    let done = 0;
    ids.forEach((id) => {
      const inputDone = input.find((i) => i.member_area_tool_id === id);
      if (inputDone) done++;
    });
    return done;
  };

  const handleCollapse = (step) => {
    setStepId(step);

    if (step === selectedStepId) {
      setCollapse(!collapse);
    } else {
      setCollapse(true);
    }
  };

  return (
    <Wrapper>
      {data.map((step, i) => (
        <div key={step.id}>
          <BundleWrapper onClick={() => handleCollapse(step.id)}>
            <CircleWrapper>
              <CircleProgressBar
                value={getProgressByStep(step)}
                variant="determinate"
                size={25}
                thickness={5}
              />
              {step.rows.length > 0 && (
                <>
                  <Line
                    sx={{
                      backgroundColor: `${
                        selectedStepId === step.id && collapse ? '' : 'inherit'
                      }`,
                    }}
                  />
                  <Line
                    sx={{
                      backgroundColor: `${
                        selectedStepId === step.id && collapse ? '' : 'inherit'
                      }`,
                    }}
                  />
                </>
              )}
            </CircleWrapper>
            <TextWrapper>
              <Title>{step.title}</Title>
              <ClassesNumber>{`${getDoneByStep(step)} de ${
                step.rows.length
              } aula${step.rows.length > 1 ? 's' : ''}`}</ClassesNumber>
            </TextWrapper>
          </BundleWrapper>
          {step.rows.map((task, j) => {
            if (task.type != 2) count++;
            return (
              <Collapse
                key={task.id}
                in={selectedStepId === step.id && collapse}
                timeout={300}
              >
                <StepsWrapper onClick={() => onGoTo(task.id, task)}>
                  <CircleWrapper>
                    <Line />
                    {task.type == 2 && (
                      <>
                        <Square />
                        <Line />
                      </>
                    )}
                    {task.type != 2 && (
                      <>
                        <Dot
                          className={
                            activeid === task.id ? 'active-background' : ''
                          }
                          sx={{
                            backgroundColor: getIsDone(task.id)
                              ? '#38c284'
                              : 'unset',
                          }}
                        />
                        {j + 1 !== step.rows.length ? (
                          <Line />
                        ) : (
                          <Box height={16} />
                        )}
                      </>
                    )}
                  </CircleWrapper>
                  <TextWrapper>
                    <ClassesNumber
                      className={activeid === task.id ? 'active' : ''}
                      sx={{
                        marginTop: '-0.1rem',
                      }}
                    >{`${task.type != 2 ? count + ' -' : ''} ${
                      task.title
                    }`}</ClassesNumber>
                  </TextWrapper>
                </StepsWrapper>
              </Collapse>
            );
          })}
        </div>
      ))}
    </Wrapper>
  );
};

export default ProgressBar;
