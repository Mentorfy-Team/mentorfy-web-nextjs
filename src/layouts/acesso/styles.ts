import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiGrid from '@mui/material/Unstable_Grid2';
import styled from '@mui/system/styled';

export const Grid = styled(MuiGrid)``;

export const Wrapper = styled(Box)`
  align-self: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
  width: 100%;

  input {
    color: ${({ theme }) => theme.palette.caption.main};
  }
`;

export const Accent = styled('label')`
  color: ${({ theme }) => theme.palette.accent.main};
`;

export const LinkButton = styled('label')`
  cursor: pointer;
`;

export const InputField = styled(TextField)`
  margin: 1.5rem 0;
  * {
    color: ${(props) => props.theme.palette.text.secondary};
  }
  &:hover fieldset {
    border-color: grey !important;
  }

  @media (max-width: 500px) {
    margin: 1rem 0;
  }
`;

export const AlignSelf = styled(Box)`
  align-self: center;
`;

export const Title = styled('h1')`
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: 0.5rem;

  @media (min-width: 500px) {
    font-size: 1.8rem;
  }
`;

export const SubTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  @media (min-width: 500px) {
    font-size: 1.1rem;
  }
  @media (min-width: 1400px) {
    font-size: 1.2rem;
  }
`;

export const InfoText = styled(Typography)`
  align-self: center;
  color: ${({ theme }) => theme.palette.caption.dark};
  font-size: 0.9rem;
  margin-top: 1rem;

  @media (min-width: 500px) {
    margin: 0.5rem 0;
    margin-top: 1.5rem;
  }
`;

export const LoginButton = styled(Button)`
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
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`;
