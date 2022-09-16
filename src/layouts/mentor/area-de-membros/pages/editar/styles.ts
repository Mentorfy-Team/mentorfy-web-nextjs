import Box from '@mui/material/Box';
import ButtonMui from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const ButtonsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Button = styled(ButtonMui)``;

export const CustomTypograpy = styled(Typography)`
  color: ${({ theme }) => theme.palette.tertiary.main};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2rem;
  margin: 1.2rem auto;
  text-align: start;
`;

export const Steps = styled(Box)`
  border-radius: 1.2rem 1.2rem 0 0;
  margin: 0 0 1.8rem 0;
`;

export const BoxHeader = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.caption.dark};
  border-top-left-radius: 1.2rem;
  border-top-right-radius: 1.2rem;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1.4rem 0;
  .css-31awu6-MuiButtonBase-root-MuiIconButton-root {
    padding: 0;
  }
`;

export const WrapperContent = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 0 0 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 2.5rem;

  fieldset {
    height: 3rem;
  }
  .css-1x8ds66-MuiFormControl-root-MuiTextField-root {
    height: 3rem;
  }
  input {
    padding: 0.75rem 0.9rem;
  }
`;

export const AddImgButton = styled(Button)`
  background: none;
  font-weight: 500;
  height: 0;
  margin: 0;
  padding: 0;
  text-transform: none;
`;

export const TaskBox = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 0.3rem;
  height: 13.5rem;
  margin: 1rem 0;
  overflow: auto;
  padding: 1rem;
  width: 100%;
`;

export const Task = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 0.3rem;
  color: ${({ theme }) => theme.palette.tertiary.main};
  display: flex;
  gap: 1rem;
  height: 2.8rem;

  justify-content: center;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
`;

export const TaskTitle = styled(Box)`
  align-items: center;
  border-radius: 0.3rem;
  color: ${({ theme }) => theme.palette.text.primary};

  display: flex;
  flex-wrap: nowrap;
  font-size: 1rem;

  font-weight: 400;
  height: 1.8rem;

  line-height: 1.2rem;
  overflow: hidden;
  width: 70%;
`;

export const ModalBox = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 0.6rem;
  padding: 1rem 2.5rem;
  width: 35%;
`;
