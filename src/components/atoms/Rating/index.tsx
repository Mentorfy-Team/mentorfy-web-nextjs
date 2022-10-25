import * as React from 'react';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const labels: { [index: string]: string } = {
  0.5: '1',
  1: '2',
  1.5: '3',
  2: '4',
  2.5: '5',
  3: '6',
  3.5: '7',
  4: '8',
  4.5: '9',
  5: '10',
};

export default function TextRating({ value, setValue }) {
  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={value / 2}
        onChange={(_, newValue) => {
          setValue(newValue * 2);
        }}
        precision={0.5}
        emptyIcon={
          <StarIcon
            style={{ color: 'white', opacity: 0.1 }}
            fontSize="inherit"
          />
        }
      />
      <Box sx={{ ml: 2, color: 'gray', fontSize: '0.9rem' }}>
        {labels[value / 2]}
      </Box>
    </Box>
  );
}
