import ModalComponent from '~/components/modules/Modal';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { AcessLevelSelectField } from '../AddMentorModal/styles';
import { useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';

const AssignProductsModal: React.FC<{
  team: TeamTypes.TeamTree;
  products: ProductTypes.Product[];
  onSubmit;
  open: boolean;
  title: string;
  setOpen: (value: boolean) => void;
}> = ({ open, setOpen, products = [], onSubmit, team, title }) => {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedMentors, setSelectedMentors] = useState<string[]>([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [selectedAccessLevel, setSelectedAccessLevel] = useState<string>();

  const acessLevel = ['Editor', 'Tutor', 'Gestor'];

  const [formData, setFormData] = useState<any>();

  const onChange = (event) => {
    setFormData((old) => ({
      ...old,
      team_id: team.id,
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
      title={title}
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
      saveText="Confirmar alteração"
      maxWidth="500px"
    >
      <div
        style={{
          maxWidth: '90vw',
          width: '100%',
        }}
      >
        Adicione ou remova produtos para acesso do time.
      </div>
      <AcessLevelSelectField
        sx={{
          maxWidth: '90vw',
          width: '400px',
        }}
      >
        <InputLabel>Escolha o(s) produto(s)</InputLabel>
        <Select
          value={selectedTeams}
          label="Escolha o(s) produto(s)"
          name="products"
          multiple
          renderValue={(selected) =>
            products
              .filter(
                (product) => (selected as string[]).indexOf(product.id) > -1,
              )
              .map((product) => product.title)
              .join(', ')
          }
          onChange={(e) => {
            if (
              e.target.value.includes('0') &&
              selectedTeams[selectedTeams.length - 1] !== '0'
            ) {
              setSelectedTeams(
                (e.target.value as string[]).filter((v) => v === '0'),
              );
            } else {
              setSelectedTeams(
                (e.target.value as string[]).filter((v) => v !== '0'),
              );
            }
            if ((e.target.value as string[]).some((v) => v === '0')) {
              onChange({
                target: {
                  value: products.map((team) => team.id),
                  name: 'products',
                },
              });
            } else {
              onChange(e);
            }
            setSelectedMentors([]);
          }}
        >
          <MenuItem value={'0'}>Todos</MenuItem>
          {products?.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              <Checkbox
                color="success"
                checked={selectedTeams.indexOf(team.id) > -1}
              />
              {team.title}
            </MenuItem>
          ))}
        </Select>
      </AcessLevelSelectField>
    </ModalComponent>
  );
};

export default AssignProductsModal;
