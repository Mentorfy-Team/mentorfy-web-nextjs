import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';

import { useCallback, useState } from 'react';
import Radio from '~/components/atoms/Radio';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RenderNewMentorForm from './NewMentorForm';
import RenderExistentMentorForm from './ExistentMentoForm';

const NewMentorModal = ({ open, setOpen }) => {
  const [isNewMentor, setIsNewMentor] = useState<boolean>(true);

  const renderExistingMentorForm = useCallback(() => {
    return <RenderExistentMentorForm />;
  }, []);

  const renderNewMentorForm = useCallback(() => {
    return <RenderNewMentorForm teams={[]} />;
  }, []);

  return (
    <ModalComponent open={open} setOpen={setOpen} title="Cadastro de Mentor">
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
            <Typography>Novo mentor</Typography>
          </Box>
          <Box
            onClick={() => setIsNewMentor(false)}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <Radio checked={!isNewMentor} />
            <Typography>Usar mentor existente</Typography>
          </Box>
        </Box>

        {isNewMentor ? renderNewMentorForm() : renderExistingMentorForm()}
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default NewMentorModal;
