import React from 'react';

import { Button, Container } from './styles';

const CustomTab = ({ onClick }) => {
  return (
    <Container>
      <Button selected>Login</Button>
      <Button onClick={onClick}>Crie sua conta</Button>
    </Container>
  );
};

export default CustomTab;
