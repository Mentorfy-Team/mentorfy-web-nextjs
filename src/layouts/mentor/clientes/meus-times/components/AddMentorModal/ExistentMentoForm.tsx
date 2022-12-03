import InputField from '~/components/atoms/InputField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

import { AcessLevelSelectField } from './styles';

const RenderExistentMentorForm = ({ onChange, onSubmit, teams }) => {
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
    <>
      <InputField label="Nome" placeholder="Ex: João José" />

      <InputField label="Email" placeholder="Ex: joaojose@mentorfy.com" />

      <AcessLevelSelectField>
        <InputLabel shrink>Equipe</InputLabel>
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
    </>
  );
};

export default RenderExistentMentorForm;
