import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid2 from '@mui/material/Unstable_Grid2';

export const Wrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const Grid = styled(Grid2)`
  display: flex;
`;

export const Item = styled(Box)`
  align-items: flex-start;
  background-color: #29282d;
  display: flex;

  height: 8.875rem;
  justify-content: space-between;
  padding: 1.6rem 2.3rem;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    height: 6.5rem;
    padding: 1rem 1rem;
  }

  width: 23rem;
`;

export const GridWrapper = styled(Box)``;

export const TextWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    gap: 1rem;
  }
`;

export const ButtonsWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 1.8rem;

  justify-content: end;
  margin-top: 4.1rem;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: 1rem;
    margin-top: 2rem;
  }
`;

export const ClientsOptionsButton = styled(Button)`
  align-items: center;
  border-radius: 10px;
  display: flex;

  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  gap: 0.75rem;

  height: 2.8125rem;

  justify-content: center;
  line-height: 1rem;
  text-transform: none;

  width: 12.5rem;

  @media (max-width: 500px) {
    width: 3.5rem;
  }
`;
