import { ArrowOutward } from '@mui/icons-material';
import Box from '@mui/material/Box';
import React from 'react';
import { Percentage, Title, Value } from './styles';

// import { Container } from './styles';

const StatusCard = ({ title, value, percentage, sign = '+' }) => {
  return (
    <div>
      <Box display="flex" gap={2}>
        <Title>{title}</Title>
        <Box
          sx={{
            backgroundColor: percentage >= 0 ? '#162F29' : '#2F1616',
            width: '1.6rem',
            height: '1.6rem',
            borderRadius: '20%',
            display: 'flex',
            placeContent: 'center',
            alignItems: 'center',
            // rotate 180deg
            transform: percentage >= 0 ? '' : 'rotate(180deg)',
          }}
        >
          <ArrowOutward
            color={percentage >= 0 ? 'success' : 'error'}
            fontSize="small"
          />
        </Box>
      </Box>
      <Box display="flex" gap={1} alignItems="center">
        <Value>{value}</Value>
        <Percentage value={percentage}>
          {percentage >= 0 ? sign : ''}
          {percentage}%
        </Percentage>
      </Box>
    </div>
  );
};

export default StatusCard;
