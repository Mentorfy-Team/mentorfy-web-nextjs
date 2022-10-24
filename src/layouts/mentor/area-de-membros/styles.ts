import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const OptionsWrapper = styled(Box)``;

export const AreaWrapper = styled(Box)`
cursor: pointer;
position: relative;
transition: all 0.1s ease-in-out;
 :hover {
  transform: scale(0.95);
 }
 margin-bottom: 1rem;
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
`;

export const ProductTitle = styled(Typography)`
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 900;
  line-height: 2rem;
  margin-bottom: 0.5rem;

  max-width: 23ch;
  overflow: hidden;
  text-align: start;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
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
