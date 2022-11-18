import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

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
