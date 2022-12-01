import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';

import { useCallback, useState } from 'react';
import Radio from '~/components/atoms/Radio';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RenderNewMentorForm from './NewMentorForm';
import RenderExistentMentorForm from './ExistentMentoForm';

const NewMentorModal = ({ open, setOpen, teams, onSubmit }) => {
  const [isNewMentor, setIsNewMentor] = useState<boolean>(true);
  const [formData, setFormData] = useState<any>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((old) => ({
      ...old,
      [event.target.name]: event.target.value,
    }));
  };

  const renderExistingMentorForm = useCallback(() => {
    return (
      <RenderExistentMentorForm
        teams={teams}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    );
  }, [onSubmit, teams]);

  const renderNewMentorForm = useCallback(() => {
    return (
      <RenderNewMentorForm
        teams={teams}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    );
  }, [onSubmit, teams]);

  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      onSave={() => onSubmit(formData)}
      title="Adicionar Mentor"
    >
      <ModalDialogContent>
        <Box
          sx={{ display: 'flex', width: '100%' }}
          justifyContent="space-around"
        >
          <Box
            onClick={() => setIsNewMentor(true)}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <Radio checked={isNewMentor} />
            <Typography>Novo cadastro</Typography>
          </Box>
          <Box
            onClick={() => setIsNewMentor(false)}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <Radio checked={!isNewMentor} />
            <Typography>Usar existente</Typography>
          </Box>
        </Box>

        {isNewMentor ? renderNewMentorForm() : renderExistingMentorForm()}
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default NewMentorModal;
