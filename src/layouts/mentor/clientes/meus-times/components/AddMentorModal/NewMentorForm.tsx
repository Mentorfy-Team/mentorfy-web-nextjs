import InputField from '~/components/atoms/InputField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AcessLevelSelectField } from './styles';
import FormGroup from '@mui/material/FormGroup';
import { useState } from 'react';

const RenderNewMentorForm: React.FC<{
  teams: TeamTypes.TeamTree[];
  onChange;
  onSubmit;
}> = ({ teams = [], onChange }) => {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  return (
    <FormGroup row>
      <AcessLevelSelectField>
        <InputLabel>Escolha a equipe</InputLabel>
        <Select
          value={selectedTeams}
          label="Escolha a equipe"
          name="teams"
          multiple
          onChange={(e) => {
            setSelectedTeams(e.target.value as string[]);
            onChange(e);
          }}
        >
          {teams?.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.title}
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
    </FormGroup>
  );
};

export default RenderNewMentorForm;
