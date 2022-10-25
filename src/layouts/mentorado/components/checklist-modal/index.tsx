import { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import {
  BpCheckedIcon,
  BpIcon,
  CloseButton,
  Description,
  OptionsBox,
  OptionsText,
  OptionsWrapper,
} from './styles';

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
}: MentoredComponents.Props<ToolData[], InputProps, ExtraProps>) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState(userInput?.data || []);

  const theme = useTheme();
  const [color, setColor] = useState(false);

  const handleFinish = () => {
    onChange({ data: input, finished: taskData.length === input.length });
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
          '& .MuiSvgIcon-root': { fontSize: 20 },
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
      <ModalDialogContent
        isMentorado
        sx={{ width: '700px', maxHeight: '500px' }}
      >
        <Description>{descriptionData}</Description>

        <OptionsWrapper>
          {taskData?.map((task) => (
            <OptionsBox
              key={task.id}
              onClick={() => {
                setColor((prev) => !prev);
                const index = input.findIndex((item) => item.id === task.id);
                if (index >= 0) {
                  setInput((old) => {
                    const newInput = [...old];
                    newInput[index] = { id: task.id, value: !old[index].value };
                    return newInput;
                  });
                } else {
                  setInput((old) => [...old, { id: task.id, value: true }]);
                }
              }}
              sx={{ cursor: 'pointer' }}
            >
              <BpCheckbox
                checked={input?.find((i) => i.id === task.id)?.value || false}
              />
              <OptionsText
                sx={{
                  color: `${
                    input?.find((i) => i.id === task.id)?.value
                      ? '#7DDC51'
                      : '#E9E7E7'
                  }`,
                }}
              >
                {task.title}
              </OptionsText>
            </OptionsBox>
          ))}
        </OptionsWrapper>

        <CloseButton onClick={handleFinish}>Salvar</CloseButton>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default ChecklistModal;
