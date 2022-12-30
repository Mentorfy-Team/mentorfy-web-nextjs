import Box from '@mui/material/Box';
import { css, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const TipWrapper = styled(Box)<{ error? }>`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.light};
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  padding: 1rem;

  ${({ error }) =>
    error &&
    css`
      img {
        filter: saturate(8) hue-rotate(138deg) contrast(8) brightness(0.75);
      }
    `}

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.palette.secondary.main};
  }
`;

export const TipText = styled(Typography)<{ error? }>`
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1rem;

  span {
    color: ${({ theme, error }) =>
      !error ? 'red' : theme.palette.secondary.main};
    margin: 0 0.2rem 0 0.2rem;
  }
`;
