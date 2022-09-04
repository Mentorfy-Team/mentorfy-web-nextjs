import React from 'react';
import {
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { SelectField } from '~/components';
import { SelectFormControl } from './styles';

// import { Container } from './styles';

const SelectActiveProduct: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 500px)');

  return (
    <SelectFormControl
      sx={{
        minWidth: !isMobile ? '300px' : 'unset',
      }}
      required
    >
      <Select value={2} label="" onChange={() => {}}>
        <MenuItem value={2}>Mentoria 4S</MenuItem>
        <MenuItem value={1}>Meu Produto 2</MenuItem>
        <MenuItem value={0}>Meu Produto 3</MenuItem>
      </Select>
    </SelectFormControl>
  );
};

export default SelectActiveProduct;
