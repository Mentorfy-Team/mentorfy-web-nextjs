import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

type Props = {
  selected?: boolean;
};

export const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  text-align: center;
`;

export const Button = styled(Box)<Props>`
  cursor: pointer;
  flex: 1;
  border-bottom: 2px solid
    ${({ selected, theme }) =>
      selected ? theme.palette.secondary.main : theme.palette.caption.main};
`;
