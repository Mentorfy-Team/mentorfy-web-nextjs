import * as React from 'react';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import { RatingBox } from './styles';

type Props = {
  isWheelOLife?: boolean;
  value?: number;
  setValue?: any;
  readOnly?: boolean;
};
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

const TextRating: React.FC<Props> = ({
  value,
  setValue,
  isWheelOLife,
  readOnly,
}) => {
  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <RatingBox
        name="text-feedback"
        isWheelOLife={isWheelOLife}
        readOnly={readOnly}
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
      <Box
        sx={{
          ml: 2,
          mt: 0.6,
          color: 'gray',
          fontSize: `${isWheelOLife ? '1.2rem' : '0.9rem'}`,
        }}
      >
        {labels[value / 2]}
      </Box>
    </Box>
  );
};

export default TextRating;
