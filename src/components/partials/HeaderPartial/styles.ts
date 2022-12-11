import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const AvatarWrapper = styled('b')`
  cursor: pointer;
  margin-top: 6px;
  position: relative;
  svg {
    scale: 0.9;
  }
`;

export const Text = styled(Typography)`
  font-size: 0.8rem;
`;

export const MenuItem = styled(Typography)`
  font-weight: 300;
  padding: 8px 16px 8px 16px;
  width: 140px;
`;

export const AppBar = styled(MuiAppBar)`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.caption.dark};
  box-shadow: none;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  height: 50px;
  padding-right: 2rem;
  > div {
    flex: 1;
  }
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
  svg {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: white;
    border: 1px solid ${({ theme }) => theme.palette.secondary.dark};
    color: ${({ theme }) => theme.palette.secondary.dark};
    border-radius: 5px;
    padding: 0.1rem 0.5rem;
    font-size: 0.9rem;
  }
`;

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
