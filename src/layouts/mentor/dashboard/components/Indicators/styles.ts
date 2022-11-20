import Box from '@mui/material/Box';
import { css, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

type Props = {
  isnegative?: string;
};
export const Wrapper = styled(Grid)`
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

export const Indicator = styled(Grid)``;

export const Card = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  height: 118px;
  padding: 1.2rem 1rem;
  // space even between items
  justify-content: space-between;
`;

export const IndicatorValue = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 110.52%;
`;

export const IndicatorPercent = styled(Typography)<Props>`
  color: ${({ theme }) => theme.palette.failure.main};
  font-size: 16px;
  font-weight: 700;
  line-height: 110.52%;

  ${({ isnegative }) =>
    !!isnegative &&
    css`
      color: #00d75b;
    `}
`;

export const IndicatorTitle = styled(Typography)<Props>`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 18px;
  font-weight: 500;
  line-height: 110.52%;
`;

export const ArrowBox = styled(Box)`
  align-items: center;
  background-color: #162f29;
  border-radius: 4px;
  display: flex;
  height: 48.78px;
  justify-content: center;
  width: 50px;
`;
export const RedArrowBox = styled(Box)`
  align-items: center;
  background-color: #312127;
  border-radius: 4px;
  display: flex;
  height: 48.78px;
  justify-content: center;
  width: 50px;
`;
