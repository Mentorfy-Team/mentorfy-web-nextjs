import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { AcessLevelSelectField } from './../AddMentorModal/styles';
import { useEffect, useState } from 'react';

const DeleteAttrModal: React.FC<{
  teams: TeamTypes.TeamTree[];
  onSubmit;
  open;
  setOpen;
}> = ({ open, setOpen, teams, onSubmit }) => {
  const [formData, setFormData] = useState<any>();
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<string>();
  const [selectedClient, setSelectedClient] = useState<string>();

  const onChange = (event: any) => {
    setFormData((old) => ({
      ...old,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (!open) {
      setSelectedTeams([]);
      setSelectedMentor(null);
    }
  }, [open]);

  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      title="Remover Atribuição de Mentor"
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
          <InputLabel>Escolha o Mentor</InputLabel>
          <Select
            required
            value={selectedMentor}
            label="Escolha o Mentor"
            name="team_member_id"
            onChange={(e) => {
              setSelectedMentor(e.target.value);
              onChange(e);
            }}
          >
            {teams
              .reduce((acc, team) => {
                // unique
                const unique = team.team_member?.filter(
                  (tm) => !acc.some((a) => a.profile_id === tm.profile_id),
                );
                if (!unique) return acc;
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
        <AcessLevelSelectField>
          <InputLabel>Escolha o(s) cliente(s)</InputLabel>
          <Select
            value={selectedClient}
            label="Escolha seu(s) cliente(s)"
            name="team_member_client_id"
            onChange={(e) => {
              setSelectedClient(e.target.value[0] as string);
              onChange({
                target: {
                  name: 'team_member_client_id',
                  value: e.target.value[0],
                },
              });
              onChange({
                target: {
                  name: 'client_id',
                  value: e.target.value[1],
                },
              });
            }}
          >
            <MenuItem value={'0'}>Todos</MenuItem>
            {teams
              .reduce((acc, team) => {
                // unique
                const unique = team.team_member?.filter(
                  (tm) => !acc.some((a) => a.profile_id === tm.profile_id),
                );
                if (!unique) return acc;
                return [...acc, ...unique];
              }, [])
              .find((tm) => {
                return tm.profile_id == selectedMentor;
              })
              ?.team_member_client?.map((tmc) => (
                <MenuItem key={tmc.id} value={[tmc.id, tmc.profile_id]}>
                  {tmc.profile.name}
                </MenuItem>
              ))}
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

export default DeleteAttrModal;
