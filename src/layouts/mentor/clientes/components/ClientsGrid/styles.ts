import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Item = styled(Box)`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.palette.primary.light};
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

  p {
    font-size: clamp(0.8rem, 1vw, 1.2rem);
  }
`;
