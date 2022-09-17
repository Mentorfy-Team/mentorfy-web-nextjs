import { useCallback, useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import BootstrapDialog from '~/components/atoms/BootstrapDialog';
import InputField from '~/components/atoms/InputField';
import SelectField from '~/components/atoms/SelectField';
import { MentorRoutes } from '~/consts';
import { MoneyFormatComponent } from '~/helpers/MoneyFormatComponent';
import { CreateClient } from '~/services/client.service';
import { CreateProduct, ListProducts } from '~/services/product.service';
import { BootstrapDialogTitle, Form } from './styles';

export default function CreateClientDialog({
  open,
  setOpen,
  onUpdate,
  access_token,
  user,
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductClient.Product[]>([]);

  const { setValue, watch, handleSubmit } =
    useForm<ProductClient.CreateProduct>();
  const { name, phone, email, product } = watch();

  const handleChange = (e, name) => {
    setValue(name, e.target.value);
  };

  useEffect(() => {
    (async () => {
      const { products } = await ListProducts(access_token, user.id);
      setProducts(products);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token]);

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

      onUpdate();
      setOpen(false);
      setIsLoading(false);
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
              <InputLabel>Produto Relacionado (Opcional)</InputLabel>
              <Select
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
