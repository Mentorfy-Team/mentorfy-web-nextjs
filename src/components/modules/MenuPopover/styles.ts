import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
export const PopoverBox = styled(Box)`
  span {
    cursor: pointer;
  }
  button {
    font-size: 0.7rem;
    height: 2rem;
    justify-content: left;
    min-width: 8rem;
    width: 100px;
    .MuiSvgIcon-root {
      width: 1rem !important;
    }
  }
`;

export const MenuItem = styled(Typography)`
  font-weight: 300;
  padding: 8px 16px 8px 16px;
  width: 140px;
`;
