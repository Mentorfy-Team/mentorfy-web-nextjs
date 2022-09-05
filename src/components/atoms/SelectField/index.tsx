import { FC } from 'react';
import { FormControlProps } from '@mui/material';
import { SelectFormControl } from './styles';

const SelectField: FC<FormControlProps> = (props) => {
  return <SelectFormControl {...(props as any)} />;
};

export default SelectField;
