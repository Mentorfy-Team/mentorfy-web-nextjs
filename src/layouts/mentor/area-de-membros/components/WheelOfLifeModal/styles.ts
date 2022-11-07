import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputField from '~/components/atoms/InputField';
import { styled } from '@mui/material/styles';

export const AreasBox = styled(Box)`
  align-items: center;
  border-bottom: 1px solid #6e6e6e55;
  display: flex;
  float: right;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  padding: 0 0 0.2rem 0;
  width: 95%;
`;

export const SaveButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  font-size: 0.6rem;
  font-weight: 400;
  line-height: 0.8rem;
  margin-left: 0.3rem;
  min-width: 49px;
  padding: 0;
`;

export const DeleteButton = styled(Button)`
  background-color: none;
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 0.6rem;
  font-weight: 400;
  line-height: 0.8rem;
  min-width: 49px;
  padding: 0;
`;

export const AddAreaButton = styled(Button)`
  color: ${({ theme }) => theme.palette.accent.main};
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 0.9rem;
  margin-top: 1rem;
  text-transform: none;
`;

export const AreaTitle = styled(Typography)`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1rem;
  margin-left: 0.5rem;
  opacity: 0.9;
  padding: 0.6rem 0;
  width: 80%;
`;

export const AreaField = styled(InputField)`
  border: none;
  margin-left: 0.7rem;
  .MuiOutlinedInput-root {
    height: 2rem;
  }
`;
