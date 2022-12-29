import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

type Props = {
  isWheelOLife?: boolean;
};
export const RatingBox = styled(Rating)<Props>`
  .MuiRating-decimal {
    font-size: 3rem;
    &:hover {
      font-size: 3rem;
    }
    &:focus-within {
      font-size: 3rem;
    }
  }
`;
