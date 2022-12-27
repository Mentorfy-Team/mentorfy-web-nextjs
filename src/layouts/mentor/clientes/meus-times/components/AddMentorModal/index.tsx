import ModalComponent from '~/components/modules/Modal';

import { useCallback, useState } from 'react';
import RenderNewMentorForm from './NewMentorForm';
import RenderExistentMentorForm from './ExistentMentoForm';

type Props = {
  open;
  setOpen;
  onSubmit;
  refData: string;
};

const NewMentorModal = ({ open, setOpen, onSubmit, refData }: Props) => {
  const [isNewMentor, setIsNewMentor] = useState<boolean>(true);
  const [formData, setFormData] = useState<any>();

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((old) => ({
        ...old,
        teams: [refData],
        [event.target.name]: event.target.value,
      }));
    },
    [refData],
  );

  const renderExistingMentorForm = useCallback(() => {
    return <RenderExistentMentorForm onChange={onChange} onSubmit={onSubmit} />;
  }, [onChange, onSubmit]);

  const renderNewMentorForm = useCallback(() => {
    return <RenderNewMentorForm onChange={onChange} />;
  }, [onChange]);

  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      onSave={() => {
        onSubmit(formData);
        setOpen(false);
      }}
      title="Adicionar Mentor"
    >
      {/* <Box
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
      </Box> */}

      {renderNewMentorForm()}
      {/* {isNewMentor ? renderNewMentorForm() : renderExistingMentorForm()} */}
    </ModalComponent>
  );
};

export default NewMentorModal;
