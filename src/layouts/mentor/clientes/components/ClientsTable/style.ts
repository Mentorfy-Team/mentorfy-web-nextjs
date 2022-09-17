import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const ProductBox = styled(Box)`
  background: ${({ theme }) => theme.palette.secondary.main};
  border-radius: 10px;
  display: flex;
  height: 24px;
  justify-content: center;
  padding-top: 3px;
  width: 7rem;
`;

export const ProductWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
`;
export const Qty = styled(Box)`
  background: ${({ theme }) => theme.palette.secondary.main};
  border-radius: 50px;
  display: flex;
  font-size: 12px;
  height: 24px;
  justify-content: center;
  margin-left: 8px;
  padding-top: 5px;
  width: 24px;
`;

export const P = styled(Typography)`
  float: right;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  opacity: 0.7;
`;

export const ArrowButton = styled('button')`
  background: none;
  border: none;
  color: ${({ theme }) => theme.palette.text.primary};
  cursor: pointer;
  outline: none;

  #Arrow {
    width: 1rem;
  }
`;
