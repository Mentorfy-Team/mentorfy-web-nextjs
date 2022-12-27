import Radio, { RadioProps } from '@mui/material/Radio';
import React from 'react';

import { Container } from './styles';

const RadioContainer: React.FC<RadioProps> = (props) => {
  return (
    <Container>
      <Radio {...props} />
    </Container>
  );
};

export default RadioContainer;
