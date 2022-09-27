import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SelectField from '~/components/atoms/SelectField';

export const Card = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Spacing = styled(Box)`
  padding: 0 1.5rem;
`;

export const Title = styled(Typography)`
  text-align: start;
`;

export const Header = styled('header')`
  background-color: ${({ theme }) => theme.palette.caption.dark};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0.5rem 0;
`;

export const InputField = styled(TextField)`
  outline: none;
  width: 100%;
  input {
    font-size: 0.8rem;
  }
  label {
    color: ${({ theme }) => theme.palette.text.primary};
  }
  fieldset {
    border-color: ${({ theme }) => theme.palette.text.primary};
  }
`;

export const CustomSelectField = styled(SelectField)`
  height: 2.8rem;
  outline: none;
  width: 100%;
  input {
    font-size: 0.9rem;
    height: 0.625rem;
  }
  label {
    color: ${({ theme }) => theme.palette.text.primary} !important;
  }
  fieldset {
    border-color: #fff !important;
    height: 2.8rem;
  }
  .MuiOutlinedInput-input {
    padding: 9.5px 14px;
  }
`;

export const CustomTypography = styled(Typography)``;

export const UploadButton = styled(Button)`
  color: ${({ theme }) => theme.palette.accent.main};
  font-weight: bold;
  path {
    fill: ${({ theme }) => theme.palette.accent.main};
  }
`;

export const AvatarWrapper = styled('div')`
  align-items: center;
  display: flex;
  gap: 1rem;
  align-self: flex-start;
  justify-content: center;
  
  svg {
  }
`;

export const Session = styled('div')`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const CardDivider = styled('div')`
  margin: 1.5rem 0;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.palette.primary.dark};
  border-left: 4px solid ${({ theme }) => theme.palette.secondary.main};
`;

export const Buttons = styled(LoadingButton)`
  font-size: 0.8rem;
  font-weight: 500;
  height: 0rem;
  min-width: 0px;
  padding: 0;
  text-transform: none;
`;

export const Form = styled('form')`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;

  .submit-button {
    align-self: flex-end;
    height: 2rem;
    margin-top: 1.5rem;
    padding: 0.1rem 1rem;
  }
  svg {
    color: white;
  }
`;

export const BOX = styled(Box)`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;
