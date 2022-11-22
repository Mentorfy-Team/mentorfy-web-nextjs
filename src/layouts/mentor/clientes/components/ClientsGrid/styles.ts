import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Item = styled(Box)`
  align-items: flex-start;
  background-color: #29282d;
  border: 1px solid ${({ theme }) => theme.palette.accent.dark};
  border-radius: 10px;
  display: flex;

  height: 8.9rem;
  justify-content: space-between;
  padding: 1.6rem 2.3rem;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    height: 6.5rem;
    padding: 1rem 1rem;
  }

  svg {
    margin-top: -0.5rem;
  }
`;

export const TextWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    gap: 1rem;
  }
`;
