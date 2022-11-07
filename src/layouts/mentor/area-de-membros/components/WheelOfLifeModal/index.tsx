import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import ContentBox from '../ContentBox';
import WheelOfLifeAreas, { WheelAreasObject } from './components/Areas';

const WheelOfLifeModal = ({
  open,
  setOpen,
  onChange,
  data: {
    data: areaData,
    title: titleData,
    description: descriptionData,
  },
}) => {
  const [title, setTitle] = useState(titleData);
  const [description, setDescription] = useState(descriptionData);

  const [areas, setAreas] = useState<WheelAreasObject[]>(
     [
      {
        id: Math.random() + '',
        title: 'Primeira área 1',
        checked: true,
      }
    ]
  );
  const handleSave = (del?: boolean) => {
    // onChange({
    //   title,
    //   description,
    //   data: checkWheel,
    //   delete: del,
    // });
    setOpen(false);
  };

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
            {areas.map((area) => (
              <WheelOfLifeAreas
              key={area.id}
              data={area}
              onSaveArea={() =>{}}
              onDeleteArea={() => {}}
              />
            ))}
          </>
        </ContentBox>
      </>
    </ModalComponent>
  );
};

export default WheelOfLifeModal;
