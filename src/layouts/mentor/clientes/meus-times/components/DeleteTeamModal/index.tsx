import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { AcessLevelSelectField } from './../AddMentorModal/styles';
import { useEffect, useState } from 'react';

const DeleteTeamModal: React.FC<{
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
      title="Remover Time"
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
            name="team_id"
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

export default DeleteTeamModal;
