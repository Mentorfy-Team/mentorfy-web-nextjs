import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import ContentBox from '../ContentBox';
import WheelOfLifeAreas, { WheelAreasObject } from './components/Areas';
import { AddAreaButton } from './styles';

const WheelOfLifeModal = ({
  open,
  setOpen,
  onChange,
  data: { data: areasData, title: titleData, description: descriptionData },
  readOnly,
}) => {
  const [title, setTitle] = useState(titleData);
  const [description, setDescription] = useState(descriptionData);

  const [areas, setAreas] = useState<WheelAreasObject[]>(
    areasData || [
      {
        id: Math.random() + '',
        title: 'Nova área 1',
      },
    ],
  );

  const addNewArea = useCallback(() => {
    const newArea = {
      id: Math.random() + '',
      title: 'Nova área ' + (areas.length + 1),
    };
    setAreas([...areas, newArea]);
  }, [areas]);

  const handleDeleteArea = (area_id: string) => {
    setAreas((oldAreas) => {
      const filteredAreas = oldAreas.filter((_area) => _area.id !== area_id);
      return [...filteredAreas];
    });
  };

  const onTitleChange = (_title, id) => {
    setAreas((oldAreas) => {
      oldAreas.find((_areas) => _areas.id === id).title = _title;
      return [...oldAreas];
    });
  };
  const handleSave = (del?: boolean) => {
    onChange({
      title,
      description,
      data: areas,
      delete: del,
    });
    setOpen(false);
  };

  return (
    <ModalComponent
      onSave={readOnly ? null : () => handleSave()}
      onDelete={readOnly ? null : () => handleSave(true)}
      onClose={readOnly ? () => setOpen(false) : null}
      open={open}
      setOpen={setOpen}
      title="Roda da Vida"
    >
      <>
        <Box sx={{ width: '100vw' }} />
        <InputField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder=""
        />
        <DescriptionInputField
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder=""
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
                onSaveArea={(_title, id) => onTitleChange(_title, id)}
                onDeleteArea={(area_id) => handleDeleteArea(area_id)}
              />
            ))}
            <Box
              sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <AddAreaButton onClick={() => addNewArea()}>
                + Nova Área
              </AddAreaButton>
            </Box>
          </>
        </ContentBox>
      </>
    </ModalComponent>
  );
};

export default WheelOfLifeModal;
