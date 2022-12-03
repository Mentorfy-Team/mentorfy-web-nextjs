import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { AcessLevelSelectField } from './../AddMentorModal/styles';
import { useState } from 'react';

const DeleteMentorModal: React.FC<{
  teams: TeamTypes.TeamTree[];
  onSubmit;
  open;
  setOpen;
}> = ({ open, setOpen, teams, onSubmit }) => {
  const [formData, setFormData] = useState<any>();
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<string>();

  const onChange = (event: any) => {
    setFormData((old) => ({
      ...old,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      title="Excluir Mentor"
      onDelete={() => {
        if (selectedMentor) {
          setOpen(false);
          onSubmit(formData);
        }
      }}
      deleteMessage
    >
      <ModalDialogContent>
        <AcessLevelSelectField>
          <InputLabel>Escolha o(s) Time(s)</InputLabel>
          <Select
            value={selectedTeams}
            label="Escolha a equipe"
            name="teams"
            required
            multiple
            onChange={(e) => {
              setSelectedTeams(e.target.value as string[]);
              onChange(e);
            }}
          >
            {[...(teams || []), { id: '0', title: 'Todos os Times' }]?.map(
              (team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.title}
                </MenuItem>
              ),
            )}
          </Select>
        </AcessLevelSelectField>

        <AcessLevelSelectField>
          <InputLabel>Escolha o(s) Time(s)</InputLabel>
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
              .filter((t) =>
                selectedTeams.some((st) => st === t.id || st === '0'),
              )
              .reduce((acc, team) => {
                // unique
                const unique = team.team_member.filter(
                  (tm) => !acc.some((a) => a.profile_id === tm.profile_id),
                );
                return [...acc, ...unique];
              }, [])
              ?.map((mentor) => {
                console.log('selectedTeams', selectedTeams);
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
          placeholder="Descreva em poucas palavras o motivo"
          onChange={onChange as any}
          required
        />
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default DeleteMentorModal;
