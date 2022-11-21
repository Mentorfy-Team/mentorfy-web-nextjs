import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { AcessLevelSelectField } from '../AddMentorModal/styles';

const AssignClientsModal = ({ open, setOpen }) => {
  const acessLevel = ['Editor', 'Tutor', 'Gestor'];

  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      title="Atribuir Clientes"
      onSave={() => {
        setOpen(false);
      }}
    >
      <ModalDialogContent>
        <InputField label="Nome do Mentor" placeholder="Ex: João José" />
        <InputField label="Email" placeholder="Ex: joaojose@mentorfy.com" />

        <AcessLevelSelectField>
          <InputLabel shrink>Nivel de Acesso</InputLabel>
          <Select placeholder="Ex: SP">
            {acessLevel.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </AcessLevelSelectField>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default AssignClientsModal;
