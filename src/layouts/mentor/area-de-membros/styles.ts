import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { TextField } from '~/components/atoms/DescriptionInputField/styles';
import SelectField from '~/components/atoms/SelectField';

export const OptionsWrapper = styled(Box)``;

export const AreaWrapper = styled(Box)`
  cursor: pointer;
  margin-bottom: 1rem;
  position: relative;
  :hover {
    transform: scale(0.95);
  }
  transition: all 0.1s ease-in-out;
`;

export const DefaultAreaWrapper = styled(Box)`
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

export const HeaderWrapper = styled(Box)`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
  * {
    line-height: 1.2rem;
  }
`;

export const AddProductButton = styled(Button)``;

export const MembersAreaButton = styled(Button)``;

export const CollorFullMentorfy = styled(Typography)`
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 3rem;
  text-align: start;
  text-shadow: 0px 0.15rem 0.25rem rgba(0, 0, 0, 1);
  span {
    color: #fe7d22;
  }
`;

export const AbsoluteTopBox = styled(Box)`
  left: 0;
  margin-left: 6%;
  position: absolute;
  top: 0;
`;
export const AbsoluteBottomBox = styled(Box)`
  bottom: -15px;
  left: 0;
  margin: 6%;
  position: absolute;
  width: 270px;
`;

export const ProductTitle = styled(Typography)`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  font-size: 1.5rem;
  font-style: normal;

  font-weight: 900;
  line-clamp: 2;
  line-height: 2rem;
  margin-bottom: 0.5rem;

  max-width: 23ch;
  overflow: hidden; /* number of lines to show */
  text-align: start;
  text-overflow: ellipsis;
`;

export const ImageButton = styled(Box)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.palette.text.primary};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  width: 15rem;
`;

export const DefaultProductsWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  overflow: auto;
  overflow-y: hidden;
  height: 100%;
  gap: 2rem;
`;

export const CreateAreaButton = styled(Button)`
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 2rem;
  text-transform: none;

  @media (max-width: 500px) {
    width: 1rem;
  }
`;

export const DeleteAreaButton = styled(Button)`
  margin-bottom: 1.5rem;
  text-transform: none;

  &:hover {
    background-color: ${({ theme }) => theme.palette.failure.main};
    color: #ffff;
  }

  @media (max-width: 500px) {
    width: 1rem;
  }
`;

export const ProductsSelectField = styled(SelectField)`
  height: 2.8rem;
  outline: none;
  width: 100%;
  input {
    font-size: 0.9rem;
    height: 0.625rem;
    color: #fff;
  }
  label {
    color: ${({ theme }) => theme.palette.text.primary} !important;
  }
  fieldset {
    border-color: #fff;

    height: 2.8rem;
    &:focus {
      border-color: #4a538d !important;
    }
  }
  .MuiOutlinedInput-input {
    padding: 9.5px 14px;
  }
  svg {
    fill: #ffffff;
  }
`;

export const CopyButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.success.main};
  filter: brightness();
  color: white;
  z-index: 2;
  position: absolute;
  right: 35%;
  padding: 0.5rem;
`;

export const ProductsField = styled(TextField)`
  height: 2.8rem;
  outline: none;
  width: 100%;
  input {
    color: #fff;
  }
  label {
    color: ${({ theme }) => theme.palette.text.primary} !important;
  }
  fieldset {
    border-color: #fff;

    height: 2.8rem;
  }
  .MuiOutlinedInput-input {
    padding: 6.5px 14px;
  }
  svg {
    fill: #ffffff;
  }
`;
