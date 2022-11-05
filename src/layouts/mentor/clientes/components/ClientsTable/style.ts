import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const ProductBox = styled(Box)`
  background: ${({ theme }) => theme.palette.secondary.main};
  border-radius: 2px;
  display: flex;
  height: 24px;
  max-width: 150px;
  padding: 3px 10px 0 10px;

  p {
    font-family: 'Roboto', sans-serif;
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const RemoveButton = styled(Button)`
  color: ${({ theme }) => theme.palette.error.light};
  * {
    font-size: 0.9rem;
    font-weight: 400;
  }
`;

export const SeeMoreButton = styled(Button)`
  * {
    font-size: 0.9rem;
    font-weight: 400;
  }
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
