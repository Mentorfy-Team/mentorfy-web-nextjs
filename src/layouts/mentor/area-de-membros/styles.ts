import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const OptionsWrapper = styled(Box)``;

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

export const ImageButton = styled(Box)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.palette.text.primary};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  width: 15rem;
`;

export const EmptyBox = styled(Box)`
  align-items: center;
  background: none;
  border-radius: 5px;
  color: black;
  cursor: pointer;
  display: flex;
  height: 15rem;
  justify-content: center;
  margin-right: 4rem;
  width: 15rem;
`;

export const CreatAreaButton = styled(Button)`
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  margin-right: 2rem;
  text-transform: none;

  @media (max-width: 500px) {
    width: 1rem;
  }
`;
