import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';

import { useState } from 'react';

const NewTeamModal = ({ open, setOpen, onSubmit }) => {
  const [title, setTitle] = useState<string>('');

  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      title="Novo Time"
      onSave={() => {
        onSubmit(title);
        setOpen(false);
      }}
    >
      <ModalDialogContent>
        <InputField
          label="Nome do Time"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Meu Time"
        />
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default NewTeamModal;
