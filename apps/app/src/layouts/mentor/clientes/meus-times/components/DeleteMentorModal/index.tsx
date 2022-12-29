import ModalComponent from '@app/components/modules/Modal';

import { useCallback, useEffect, useState } from 'react';
import RenderDeleteMentorForm from './form';

const DeleteMentorModal: React.FC<{
  teams: TeamTypes.TeamTree[];
  refData: string;
  onSubmit;
  open;
  setOpen;
}> = ({ open, setOpen, teams, onSubmit, refData }) => {
  const [formData, setFormData] = useState<any>();
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<string>();

  const onChange = useCallback(
    (event: any) => {
      setFormData((old) => ({
        ...old,
        teams: [refData],
        [event.target.name]: event.target.value,
      }));
    },
    [refData],
  );

  const renderNewMentorForm = useCallback(() => {
    return (
      <RenderDeleteMentorForm
        teams={teams}
        refData={refData}
        selectedMentor={selectedMentor}
        setSelectedMentor={setSelectedMentor}
        onChange={onChange}
      />
    );
  }, [onChange, refData, selectedMentor, teams]);

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
      title="Excluir Mentor"
      onDelete={() => {
        if (selectedMentor) {
          setOpen(false);
          onSubmit(formData);
        }
      }}
      deleteMessage
    >
      {renderNewMentorForm()}
    </ModalComponent>
  );
};

export default DeleteMentorModal;
