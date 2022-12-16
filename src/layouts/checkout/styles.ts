import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import InputField from '~/components/atoms/InputField';
import SelectField from '~/components/atoms/SelectField';

export const BannerWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  position: relative;
  margin-bottom: 1rem;
`;

export const Form = styled('form')`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.palette.text.primary};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2rem;
  padding-bottom: 0.5rem;

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

export const FormHeader = styled(Box)`
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1.5rem;
`;

export const InfoWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const Title = styled(Box)`
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.3rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const Author = styled(Box)`
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 1rem;
  color: ${({ theme }) => theme.palette.caption.main};
`;

export const Price = styled(Box)`
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.3rem;
  color: ${({ theme }) => theme.palette.accent.main};
`;

export const Input = styled(InputField)`
  input {
    color: ${({ theme }) => theme.palette.caption.dark};
    height: 1.5rem;
  }
  .Mui-focused {
    border-color: ${({ theme }) => theme.palette.accent.main};
  }
  .MuiInputBase-root {
    fieldset {
      border-color: #bebebe;
    }
    :hover fieldset {
      border-color: ${({ theme }) => theme.palette.accent.main};
    }
    :focus fieldset {
      border-color: ${({ theme }) => theme.palette.accent.main};
    }
  }

  & :-webkit-autofill {
    -webkit-box-shadow: none;
    box-shadow: none !important;
    -webkit-text-fill-color: ${({ theme }) =>
      theme.palette.caption.dark} !important;
  }

  svg {
    fill: gray;
  }
`;

export const CustomSelectField = styled(SelectField)`
  outline: none;
  width: 100%;
  input {
    font-size: 0.9rem;
    height: 0.625rem;
    color: ${({ theme }) => theme.palette.caption.dark};
  }
  .MuiInputBase-root {
    fieldset {
      border-color: #bebebe;
    }
  }
  .MuiFormLabel-root {
    color: ${({ theme }) => theme.palette.caption.main};
  }
  .MuiOutlinedInput-input {
    padding: 9.5px 14px;
  }
  svg {
    fill: gray;
  }
`;

export const PaymentMethWrapper = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

export const CardWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  width: 100%;
  justify-content: center;
  cursor: pointer;
  // scale x
  svg {
    transform: scaleX(0.8);
  }
`;

export const MethodText = styled(Typography)`
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 1rem;
`;

export const PaymentInfoWrapper = styled(Box)`
  display: flex;
  padding: 1rem 1.5rem;
  border: 1px solid #d9d9d9;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
`;

export const PixInfoWrapper = styled(Box)`
  display: flex;
  padding: 1.5rem;
  background-color: #e9e7e7;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
`;

export const AboutPix = styled('ul')`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 1rem;
`;
export const PixText = styled('li')`
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 1rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  text-align: start;
`;

export const PoliciesWrapper = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 0.5rem 1.2rem;
  width: 100%;
`;

export const SecurityText = styled(Typography)`
  font-weight: 400;
  font-size: 0.6rem;
  line-height: 0.9rem;
  color: ${({ theme }) => theme.palette.caption.main};
  text-align: justify;
`;

export const SaveDataText = styled(Typography)`
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 1rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const BpIcon = styled('span')`
  border: 1px solid #bebebe;
  border-radius: 50%;
  height: 18px;
  width: 18px;
`;

export const BpCheckedIcon = styled('div')`
  align-items: center;
  background-image: url('/svgs/bp-checked-icon.svg');
  border-radius: 50%;
  display: flex;
  height: 18px;
  justify-content: center;
  width: 18px;
`;
