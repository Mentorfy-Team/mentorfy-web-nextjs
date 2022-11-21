import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { AcessLevelSelectField } from '../AddMentorModal/styles';
import { useState } from 'react';

const NewTeamModal = ({ open, setOpen }) => {
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
      title="Novo Time"
      onSave={() => {
        setOpen(false);
        setSelectedProduct([]);
      }}
    >
      <ModalDialogContent>
        <InputField label="Nome" placeholder="Ex: João José" />

        <AcessLevelSelectField>
          <InputLabel shrink>Mentores Atribuídos</InputLabel>
          <Select multiple onChange={handleInputChange} value={selectedProduct}>
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

export default NewTeamModal;
