import InputField from '@app/components/atoms/InputField';
import FormGroup from '@mui/material/FormGroup';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { AcessLevelSelectField } from '../AddMentorModal/styles';

const RenderDeleteMentorForm: React.FC<{
  onChange;
  selectedMentor;
  setSelectedMentor;
  teams;
  refData;
}> = ({ onChange, selectedMentor, setSelectedMentor, teams, refData }) => {
  return (
    <FormGroup row>
      <div>
        Ao excluir um mentor, ele não terá mais acesso a clientes e produtos.
      </div>
      <AcessLevelSelectField>
        <InputLabel>Escolha o Mentor</InputLabel>
        <Select
          required
          value={selectedMentor}
          label="Escolha o Mentor"
          name="profile_id"
          onChange={(e) => {
            setSelectedMentor(e.target.value);
            onChange(e);
          }}
        >
          {teams
            ?.filter((t) => t.id === refData)
            .reduce((acc, team) => {
              // unique
              const unique = team.team_member.filter(
                (tm) => !acc.some((a) => a.profile_id === tm.profile_id),
              );
              return [...acc, ...unique];
            }, [])
            ?.map((mentor) => {
              return (
                <MenuItem key={mentor.profile_id} value={mentor.profile_id}>
                  {mentor.profile?.name}
                </MenuItem>
              );
            })}
        </Select>
      </AcessLevelSelectField>

      <InputField
        label="Motivo da Exclusão"
        name="reason"
        onChange={onChange as any}
        required
      />
    </FormGroup>
  );
};

export default RenderDeleteMentorForm;
