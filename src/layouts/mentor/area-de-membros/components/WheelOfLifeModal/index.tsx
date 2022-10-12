import { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import ContentBox from '../ContentBox';
import { AreasBox } from './styles';

const WheelAreas = [
  {
    id: 0,
    name: 'CONTRIBUIÇÃO SOCIAL',
    checked: true,
  },
  {
    id: 1,
    name: 'DESENVOLVMENTO INTELECTUAL',
    checked: true,
  },
  {
    id: 2,
    name: 'EQUILÍBRIO EMOCIONAL',
    checked: true,
  },
  {
    id: 3,
    name: 'ESPIRITUALIDADE',
    checked: true,
  },
  {
    id: 4,
    name: 'FAMÍLIA',
    checked: true,
  },
  {
    id: 5,
    name: 'LAZER E HOBBIES',
    checked: true,
  },
  {
    id: 6,
    name: 'PLENITUDE FINANCEIRA',
    checked: true,
  },
  {
    id: 7,
    name: 'REALIZAÇÃO DE PROPÓSITO',
    checked: true,
  },
  {
    id: 8,
    name: 'RELACIONAMENTO AMOROSO',
    checked: true,
  },
  {
    id: 9,
    name: 'SAÚDE E CONDIÇÃO FÍSICA',
    checked: true,
  },
  {
    id: 10,
    name: 'SAÚDE FINANCEIRA',
    checked: true,
  },
  {
    id: 11,
    name: 'VIDA SOCIAL E AMIZADE',
    checked: true,
  },
];

const WheelOfLifeModal = ({
  open,
  setOpen,
  onChange,
  data: {
    title: titleData,
    description: descriptionData,
    data: checkWheelData,
  },
}) => {
  const theme = useTheme();
  const [title, setTitle] = useState(titleData);
  const [description, setDescription] = useState(descriptionData);
  const [checkWheel, setCheckWheel] = useState<typeof WheelAreas>(
    checkWheelData || WheelAreas,
  );

  const handleSave = (del?: boolean) => {
    onChange({
      title,
      description,
      data: checkWheel,
      delete: del,
    });
    setOpen(false);
  };

  function BpCheckbox(props: CheckboxProps) {
    return (
      <Checkbox
        sx={{
          padding: '0',
          color: `${theme.palette.caption.dark}`,
          '& .MuiSvgIcon-root': { fontSize: 18 },
          '&.Mui-checked': {
            color: 'green',
          },
        }}
        disableRipple
        color="default"
        {...props}
      />
    );
  }

  return (
    <ModalComponent
      onSave={() => handleSave()}
      onDelete={() => handleSave(true)}
      open={open}
      setOpen={setOpen}
      title="Roda da Vida"
    >
      <>
        <InputField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <DescriptionInputField
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum facilisis in lobortis orci aliquet. In nisl elit sodales morbi euismod ullamcorper egestas aenean amet. Gravida penatibus massa, duis felis. Vitae, pellentesque eget nunc facilisi in dictumst. Malesuada sed condimentum viverra vel pellentesque magna."
        />
        <ContentBox>
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.1rem',
                marginBottom: '1rem',
              }}
            >
              <Typography sx={{ fontSize: '1rem', fontWeight: '600' }}>
                Áreas da Roda da Vida
              </Typography>
            </Box>
            {checkWheel.map((index) => (
              <AreasBox key={index.id}>
                <BpCheckbox
                  checked={index.checked}
                  onChange={(e) => {
                    const newCheckWheel = [...checkWheel];
                    newCheckWheel[index.id].checked = e.target.checked;
                    setCheckWheel(newCheckWheel);
                  }}
                />
                <Typography
                  sx={{ fontSize: '0.7rem', fontWeight: '300', opacity: '0.8' }}
                >
                  {index.name}
                </Typography>
              </AreasBox>
            ))}
          </>
        </ContentBox>
      </>
    </ModalComponent>
  );
};

export default WheelOfLifeModal;
