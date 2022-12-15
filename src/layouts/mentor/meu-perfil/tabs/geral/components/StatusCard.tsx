import Box from '@mui/material/Box';
import React from 'react';
import { Percentage, Title, Value } from './styles';

// import { Container } from './styles';

const StatusCard = ({ title, value, percentage }) => {
  return (
    <div>
      <Title>{title}</Title>
      <Box display="flex" gap={1} alignItems="center">
        <Value>{value}</Value>
        <Percentage>{percentage}</Percentage>
      </Box>
    </div>
  );
};

export default StatusCard;
