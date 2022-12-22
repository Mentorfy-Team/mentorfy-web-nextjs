import { TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CssTextField } from './styles';

// ? Type of Props the FormInput will receive
type FormInputProps = {
  name: string;
} & TextFieldProps;

const FormInput: FC<FormInputProps> = ({ name, ...otherProps }) => {
  // ? Utilizing useFormContext to have access to the form Context
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <CssTextField
          {...field}
          {...otherProps}
          variant="outlined"
          sx={{ m: '0.5rem 0' }}
          error={!!errors[name]}
          helperText={
            errors[name] ? (errors[name]?.message as unknown as string) : ''
          }
        />
      )}
    />
  );
};

export default FormInput;
