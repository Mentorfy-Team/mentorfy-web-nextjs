import ModalComponent from '~/components/modules/Modal';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { AcessLevelSelectField } from '../AddMentorModal/styles';
import { useEffect, useState } from 'react';

const AssignClientsModal: React.FC<{
  teams: TeamTypes.TeamTree[];
  clients: ClientTypes.Client[];
  onSubmit;
  open: boolean;
  setOpen: (value: boolean) => void;
}> = ({ open, setOpen, clients = [], onSubmit, teams = [] }) => {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedMentors, setSelectedMentors] = useState<string[]>([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [selectedAccessLevel, setSelectedAccessLevel] = useState<string>();

  const acessLevel = ['Editor', 'Tutor', 'Gestor'];

  const [formData, setFormData] = useState<any>();

  const onChange = (event) => {
    setFormData((old) => ({
      ...old,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (!open) {
      setSelectedTeams([]);
      setSelectedMentors([]);
      setSelectedClients([]);
      setSelectedAccessLevel('');
    }
  }, [open]);

  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      title="Atribuir Clientes"
      onSave={() => {
        onSubmit(formData);
        setOpen(false);
      }}
      isBlocked={
        !selectedAccessLevel &&
        selectedClients.length == 0 &&
        selectedMentors.length == 0 &&
        selectedTeams.length == 0
      }
      saveText="Atribuir"
    >
      <div>Atribua clientes para seu membro da equipe ter acesso.</div>
      <AcessLevelSelectField>
        <InputLabel>Escolha a(s) equipe(s)</InputLabel>
        <Select
          value={selectedTeams}
          label="Escolha a(s) equipe(s)"
          name="teams"
          multiple
          onChange={(e) => {
            setSelectedTeams(e.target.value as string[]);
            if ((e.target.value as string[]).some((v) => v === '0')) {
              onChange({
                target: {
                  value: teams.map((team) => team.id),
                  name: 'teams',
                },
              });
            } else {
              onChange(e);
            }
            setSelectedMentors([]);
          }}
        >
          <MenuItem value={'0'}>Todos</MenuItem>
          {teams?.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.title}
            </MenuItem>
          ))}
        </Select>
      </AcessLevelSelectField>
      <AcessLevelSelectField>
        <InputLabel>Escolha o(s) mentor(es)</InputLabel>
        <Select
          value={selectedMentors}
          label="Escolha o(s) mentor(es)"
          name="team_members"
          multiple
          onChange={(e) => {
            setSelectedMentors(e.target.value as string[]);

            if ((e.target.value as string[]).some((v) => v === '0')) {
              onChange({
                target: {
                  value: teams
                    .filter((t) =>
                      selectedTeams.some((st) => st === t.id || st === '0'),
                    )
                    .reduce((acc, team) => {
                      // unique
                      const unique = team.team_member.filter(
                        (tm) =>
                          !acc.some((a) => a.profile_id === tm.profile_id),
                      );
                      return [...acc, ...unique];
                    }, [])
                    .map((tm) => tm.id),
                  name: 'team_members',
                },
              });
            } else {
              onChange(e);
            }
            setSelectedClients([]);
          }}
        >
          <MenuItem value={'0'}>Todos</MenuItem>
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
            ?.map((mentor) => (
              <MenuItem key={mentor.id} value={mentor.id}>
                {mentor.profile.name}
              </MenuItem>
            ))}
        </Select>
      </AcessLevelSelectField>

      <AcessLevelSelectField>
        <InputLabel>Escolha seu(s) cliente(s)</InputLabel>
        <Select
          value={selectedClients}
          label="Escolha seu(s) cliente(s)"
          name="clients"
          multiple
          onChange={(e) => {
            setSelectedClients(e.target.value as string[]);

            if ((e.target.value as string[]).some((v) => v === '0')) {
              onChange({
                target: {
                  value: clients.map((c) => c.id),
                  name: 'clients',
                },
              });
            } else {
              onChange(e);
            }
          }}
        >
          <MenuItem value={'0'}>Todos</MenuItem>
          {clients?.map((client) => (
            <MenuItem key={client.id} value={client.id}>
              {client.name}
            </MenuItem>
          ))}
        </Select>
      </AcessLevelSelectField>

      <AcessLevelSelectField>
        <InputLabel>Nível de Acessox</InputLabel>
        <Select
          label="Nível de Acessox"
          name="role"
          onChange={(e) => {
            setSelectedAccessLevel(e.target.value as string);
            onChange(e);
          }}
          value={selectedAccessLevel}
        >
          {acessLevel.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </AcessLevelSelectField>
    </ModalComponent>
  );
};

export default AssignClientsModal;
