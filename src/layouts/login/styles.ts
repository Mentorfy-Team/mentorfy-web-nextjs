import { Box, Button, TextField, Typography, styled } from '@mui/material';
import MuiGrid from '@mui/material/Unstable_Grid2';

export const Grid = styled(MuiGrid)``;

export const Wrapper = styled(Box)`
  align-self: center;
  display: flex;
  flex-direction: column;
  max-width: 700px;
`;

export const InputField = styled(TextField)`
  * {
    color: ${(props) => props.theme.palette.text.secondary} !important;
  }
  &:hover fieldset {
    border-color: grey !important;
  }
  margin: 2rem 0;

  @media (max-width: 490px) {
    margin: 1rem 0;
  }
`;

export const AlignSelf = styled(Box)`
  align-self: center;
`;

export const Title = styled('h1')`
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: 0.5rem;

  b {
    color: ${({ theme }) => theme.palette.accent.main};
  }
`;

export const SubTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
`;

export const InfoText = styled(Typography)`
  align-self: center;
  color: ${({ theme }) => theme.palette.caption.dark};
  font-size: 0.9rem;
  margin-top: 1rem;
`;

export const LoginButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.accent.main};
  color: white;
  margin-top: 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.palette.accent.light};
  }
`;

export const ForgotPassButton = styled(Button)`
  color: ${({ theme }) => theme.palette.accent.main};
  margin-top: 1rem;
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
  height: 100vh;
  overflow: hidden;
  position: relative;
  width: 100%;
`;
