import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const SvgWrapper = styled('div')`
  svg {
    margin-right: 8px;
    margin-top: 6px;
    scale: 0.7;
  }
`;

export const SaveButton = styled(LoadingButton)``;

export const ReturnButton = styled(Button)`
  height: 2.5rem;
  padding: 0px;
  span {
    margin-left: 16px;
  }
  path {
    fill: ${({ theme }) => theme.palette.accent.main};
  }
`;

export const ActionButton = styled(Button)`
  color: ${({ theme }) => theme.palette.accent.main};
  cursor: pointer;
  font-size: 0.9rem;
  path {
    fill: ${({ theme }) => theme.palette.accent.main};
  }
  text-decoration: underline;
`;

export const CustomTypograpy = styled(Typography)`
  color: ${({ theme }) => theme.palette.tertiary.main};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2rem;
  margin: 1.2rem auto;
  text-align: start;
`;
