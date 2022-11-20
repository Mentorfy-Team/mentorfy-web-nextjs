import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import MuiGrid from '@mui/material/Unstable_Grid2';

export const Grid = styled(MuiGrid)``;

export const Wrapper = styled(Box)`
  align-self: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 400px;
  width: 100%;

  input {
    color: ${({ theme }) => theme.palette.text.primary};
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const Accent = styled('label')`
  color: ${({ theme }) => theme.palette.accent.main};
`;

export const LinkButton = styled('label')`
  cursor: pointer;
`;

export const AlignSelf = styled(Box)`
  align-self: center;
`;

export const ErrorHelper = styled(Typography)`
  color: ${({ theme }) => theme.palette.error.main};
  font-size: 0.8rem;
  margin-bottom: -1.2rem;
  margin-top: -0.5rem;
  text-align: center;
`;

export const Welcome = styled(Typography)`
  animation: fadeIn 0.5s;
  text-align: center;
  @media (min-width: 500px) {
    font-size: 0.8rem;
    line-height: 1.8rem;
    font-weight: 700;
  }
`;

export const AnimatedView = styled(Box)<{ loading?: boolean }>`
  animation: fadeIn 0.5s;
`;

export const HeaderTitle = styled(Typography)`
  font-weight: 700;
  margin-bottom: 1rem;
  margin-top: 0.2rem;
  max-width: 400px;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 2.5rem;
    line-height: 2.8rem;
  }
`;

export const Title = styled(Typography)`
  margin-bottom: 3rem;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 1.2rem;
    line-height: 1.6rem;
  }
`;

export const SubTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  @media (min-width: 500px) {
    font-size: 1rem;
  }
  @media (min-width: 1400px) {
    font-size: 1.1rem;
  }
`;

export const InfoText = styled(Typography)`
  align-self: center;
  font-size: 0.9rem;
  margin-top: 1rem;

  @media (min-width: 500px) {
    margin: 0.5rem 0;
    margin-top: 1.5rem;
  }
`;

export const LoginButton = styled(LoadingButton)`
  background-color: ${({ theme }) => theme.palette.accent.main};
  color: white;
  font-weight: bold;
  margin-top: 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.palette.accent.light};
  }
`;

export const ForgotPassButton = styled(Button)`
  color: ${({ theme }) => theme.palette.accent.main};
  margin-top: 1rem;

  @media (min-width: 500px) {
    margin: 1rem 0;
  }
`;

export const CreateAccountButton = styled(Button)`
  border-color: ${({ theme }) => theme.palette.accent.main};
  color: ${({ theme }) => theme.palette.accent.main};
  margin-top: 1rem;
  &:hover {
    border-color: unset;
  }
`;

export const BackgroundHolder = styled('div')`
  background-color: black;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`;
