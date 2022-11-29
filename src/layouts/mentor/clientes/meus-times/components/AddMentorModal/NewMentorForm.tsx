import InputField from '~/components/atoms/InputField';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { AcessLevelSelectField } from './styles';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';

const RenderNewMentorForm: React.FC<{ teams }> = ({ teams = [] }) => {
  const [selectedProduct, setSelectedProduct] = useState<string[]>([]);
  const [data, setData] = useState<any>({});

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((old) => ({
      ...old,
      [event.target.name]: event.target.value,
    }));
  };

  const onChangeSelect = (event: SelectChangeEvent<string[]>) => {
    setData((old) => ({
      ...old,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <FormGroup onSubmit={(e) => console.log('e.target.value')} row>
      <AcessLevelSelectField>
        <InputLabel>Escolha a equipe</InputLabel>
        <Select
          label="Equipe"
          name="team"
          multiple
          onChange={onChangeSelect}
          value={data.team}
        >
          {teams.len}
          {teams?.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </AcessLevelSelectField>

      <InputField label="Nome" name="name" onChange={onChange} />

      <InputField label="Email" name="email" onChange={onChange} />

      <InputField
        label="Telefone"
        name="phone"
        onChange={onChange}
        type={'tel'}
      />

      <InputField
        label="Limite de Clientes (opcional)"
        name="limit"
        onChange={onChange}
        placeholder="0 - Sem limites."
      />

      <Button
        variant="outlined"
        onClick={() => console.log(data)}
        sx={{
          textTransform: 'none',
          float: 'right',
          width: '40%',
          margin: '1rem 0px 0px 0px',
          height: '2.5rem',
          backgroundColor: 'green',
          color: 'white',
        }}
      >
        Salvar
      </Button>
    </FormGroup>
  );
};

export default RenderNewMentorForm;
