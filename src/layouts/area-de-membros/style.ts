import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const ImageButton = styled('button')`
  background: none;
  border: none;
  color: ${({ theme }) => theme.palette.text.primary};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
`;

export const EmptyBox = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.caption.main};
  border-radius: 5px;
  color: black;
  display: flex;
  height: 15rem;
  justify-content: center;
  width: 15rem;
`;
