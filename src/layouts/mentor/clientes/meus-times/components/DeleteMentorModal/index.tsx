import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { AcessLevelSelectField } from './../AddMentorModal/styles';
import { useState } from 'react';

const DeleteMentorModal = ({ open, setOpen }) => {
  const [selectedProduct, setSelectedProduct] = useState<string[]>([]);
  const acessLevel = ['Editor', 'Tutor', 'Gestor'];

  const handleInputChange = (e) => {
    const selectedProduct = e.target.value;

    setSelectedProduct(
      typeof selectedProduct === 'string'
        ? selectedProduct.split(',')
        : selectedProduct,
    );
  };
  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      title="Excluir Mentor"
      onDelete={() => {
        setOpen(false);
        setSelectedProduct([]);
      }}
      deleteMessage
    >
      <ModalDialogContent>
        <InputField label="Email" placeholder="Ex: joaojose@mentorfy.com" />

        <AcessLevelSelectField>
          <InputLabel shrink>Time Relacionado</InputLabel>
          <Select multiple onChange={handleInputChange} value={selectedProduct}>
            {acessLevel.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </AcessLevelSelectField>

        <InputField
          label="Motivo da Exclusão"
          placeholder="Descreva em poucas palavras o motivo"
        />
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default DeleteMentorModal;
