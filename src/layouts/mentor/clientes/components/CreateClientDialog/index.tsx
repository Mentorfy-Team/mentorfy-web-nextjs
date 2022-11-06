import { useCallback, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import BootstrapDialog from '~/components/atoms/BootstrapDialog';
import InputField from '~/components/atoms/InputField';
import SelectField from '~/components/atoms/SelectField';
import { useProducts } from '~/hooks/useProducts';
import { CreateClient } from '~/services/client.service';
import { BootstrapDialogTitle, Form } from './styles';

export default function CreateClientDialog({ open, setOpen, onUpdate, user }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { products } = useProducts(user.id);
  const { setValue, watch, handleSubmit } =
    useForm<ProductClient.CreateProduct>();
  const { name, phone, email, product } = watch();

  const handleChange = (e, name) => {
    setValue(name, e.target.value);
  };

  const onSubmit: SubmitHandler<ProductClient.CreateProduct> = useCallback(
    async (values) => {
      setIsLoading(true);
      await CreateClient(values);
      if (!values) {
        setIsLoading(false);
        return;
      }
      setValue('name', '');
      setValue('phone', '');
      setValue('email', '');
      setValue('product', '');

      await onUpdate();
      setTimeout(() => {
        setOpen(false);
        setIsLoading(false);
      }, 1000);
    },
    [onUpdate, setOpen, setValue],
  );

  const handleClose = () => {
    if (!isLoading) setOpen(false);
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
          Novo Cliente
        </BootstrapDialogTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Typography gutterBottom>
              Para criar seu novo cliente, preencha os campos a seguir. Um link
              com detalhes de acesso será enviado para o email do cliente.
            </Typography>
            <InputField
              disabled={isLoading}
              required
              color="secondary"
              label="Nome"
              placeholder=""
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => handleChange(e, 'name')}
              value={name}
            />
            <InputField
              disabled={isLoading}
              required
              color="secondary"
              label="Email"
              placeholder=""
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => handleChange(e, 'email')}
              value={email}
            />
            <InputField
              disabled={isLoading}
              color="secondary"
              label="Telefone (Opcional)"
              placeholder=""
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => handleChange(e, 'phone')}
              value={phone}
            />
            <SelectField required sx={{ width: '100%' }}>
              <InputLabel>Produto Relacionado</InputLabel>
              <Select
                disabled={isLoading}
                label="Produto Relacionado"
                color="secondary"
                value={product}
                required
                onChange={(e) => handleChange(e, 'product')}
              >
                {products?.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.title}
                  </MenuItem>
                ))}
              </Select>
            </SelectField>
          </DialogContent>
          <DialogActions sx={{ paddingRight: 3, paddingBottom: 3 }}>
            <LoadingButton
              loading={isLoading}
              disabled={isLoading}
              type="submit"
              variant="contained"
            >
              Salvar
            </LoadingButton>
          </DialogActions>
        </Form>
      </BootstrapDialog>
    </div>
  );
}
