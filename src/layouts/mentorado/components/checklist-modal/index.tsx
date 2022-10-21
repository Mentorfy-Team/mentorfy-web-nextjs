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

const ChecklistModal = ({
  open,
  setOpen,
  data: { data: taskData, title: titleData, description: descriptionData },
  onChange,
  userInput,
}) => {
  const theme = useTheme();
  const [color, setColor] = useState(false);

  const HeadText = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Image
        alt="perguntas"
        src="/svgs/checklist-icon.svg"
        height={20}
        width={18}
      />
      <>Título do Formulário</>
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
        <Description>
          Descrição do Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry s standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book.
        </Description>

        <OptionsWrapper>
          <OptionsBox
            onClick={() => setColor(!color)}
            sx={{ cursor: 'pointer' }}
          >
            <BpCheckbox />
            <OptionsText sx={{ color: `${color ? '#7DDC51' : '#E9E7E7'}` }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </OptionsText>
          </OptionsBox>
        </OptionsWrapper>

        <CloseButton onClick={() => setOpen(false)}>Fechar</CloseButton>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default ChecklistModal;
