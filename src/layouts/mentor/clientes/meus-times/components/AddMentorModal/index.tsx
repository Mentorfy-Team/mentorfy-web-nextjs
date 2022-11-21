import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { AcessLevelSelectField } from './styles';
import { useState } from 'react';

const NewMentorModal = ({ open, setOpen }) => {
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
      title="Cadastro de Mentor"
      onSave={() => {
        setOpen(false);
        setSelectedProduct([]);
      }}
    >
      <ModalDialogContent>
        <InputField label="Nome" placeholder="Ex: João José" />
        <InputField label="Email" placeholder="Ex: joaojose@mentorfy.com" />

        <AcessLevelSelectField>
          <InputLabel shrink>Produtos Atribuídos</InputLabel>
          <Select multiple onChange={handleInputChange} value={selectedProduct}>
            {acessLevel.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </AcessLevelSelectField>

        <InputField label="Limite de Clientes" placeholder="Ex: 3000" />

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

export default NewMentorModal;
