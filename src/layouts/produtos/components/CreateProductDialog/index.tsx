import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import BootstrapDialog from '~/components/atoms/BootstrapDialog';
import InputField from '~/components/atoms/InputField';
import SelectField from '~/components/atoms/SelectField';
import { Routes } from '~/consts';
import { MoneyFormatComponent } from '~/helpers/MoneyFormatComponent';
import { BootstrapDialogTitle } from './styles';

export default function CreateProduct({ open, setOpen }) {
  const route = useRouter();

  const handleClose = () => {
    setOpen(false);
    // TODO: salvar novo produto
    route.push(Routes.products_edit + '/' + 'hud2-ioqdf-002e-eee7');
  };

  return (
    <div>
      <BootstrapDialog
        id="dialog"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Novo Produto
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Para criar seu novo produto, preencha os campos a seguir.
          </Typography>
          <InputField
            required
            color="secondary"
            id="outlined-required"
            label="Nome do Produto"
            placeholder=""
            onChange={(e) => {}}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <InputField
            required
            color="secondary"
            id="outlined-required"
            label="Preço"
            placeholder="R$ "
            onChange={(e) => {}}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: MoneyFormatComponent as any,
            }}
          />
          <SelectField required sx={{ width: '100%' }}>
            <InputLabel>Entrega de Conteúdo</InputLabel>
            <Select
              value={2}
              label="Entrega de Conteúdo"
              onChange={() => {}}
              color="secondary"
            >
              <MenuItem value={2}>
                Área de Membros
                <Typography
                  component="b"
                  color={(theme) => theme.palette.accent.main}
                >
                  &nbsp;Mentorfy
                </Typography>
              </MenuItem>
              <MenuItem value={1}>Área de Membros Externa</MenuItem>
              <MenuItem value={0}>Apenas cadastros</MenuItem>
            </Select>
          </SelectField>
        </DialogContent>
        <DialogActions sx={{ paddingRight: 3, paddingBottom: 3 }}>
          <Button variant="contained" autoFocus onClick={handleClose}>
            Continuar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
