import { useCallback, useState } from 'react';
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
import { useMemberAreaTypes } from '~/hooks/useMemberAreaType';
import { CreateProduct } from '~/services/product.service';
import { BootstrapDialogTitle, Form } from './styles';

export default function CreateProductDialog({ open, setOpen }) {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { types } = useMemberAreaTypes();
  const { register, setValue, watch, handleSubmit } =
    useForm<ProductClient.CreateProduct>();
  const { title, price } = watch();

  const handleChange = (e, name) => {
    setValue(name, e.target.value);
  };

  const onSubmit: SubmitHandler<ProductClient.CreateProduct> = useCallback(
    async (values) => {
      setIsLoading(true);
      const { product, error } = await CreateProduct(values);
      if (error) {
        setIsLoading(false);
        return;
      }
      setValue('title', '');
      setValue('price', '');
      route.push(
        MentorRoutes.members_area +
          '/' +
          types.find((t) => t.id === product.deliver) +
          product.id,
      );
      setOpen(false);
      setIsLoading(false);
    },
    [route, setOpen, setValue, types],
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
          Novo Produto
        </BootstrapDialogTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            sx={{
              maxWidth: '500px',
            }}
            dividers
          >
            <Typography gutterBottom>
              Para criar seu novo produto, preencha os campos a seguir.
            </Typography>
            <InputField
              required
              color="secondary"
              label="Nome do Produto"
              placeholder=""
              InputLabelProps={{
                shrink: true,
              }}
              register={register('price')}
              onChange={(e) => handleChange(e, 'title')}
              value={title}
            />
            <InputField
              required
              color="secondary"
              label="Preço"
              placeholder="R$ "
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputComponent: MoneyFormatComponent as any,
              }}
              register={register('price')}
              onChange={(e) => handleChange(e, 'price')}
              value={price}
            />
            <SelectField required sx={{ width: '100%' }}>
              <InputLabel>Tipo de Área de Membros</InputLabel>
              <Select
                label="Tipo de Área de Membros"
                color="secondary"
                defaultValue={1}
                {...register('deliver')}
              >
                {types.map((tp) => (
                  <MenuItem key={tp.id} value={tp.id}>
                    {tp.name}
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
              Continuar
            </LoadingButton>
          </DialogActions>
        </Form>
      </BootstrapDialog>
    </div>
  );
}
