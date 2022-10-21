import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const FileWrapper = styled(Box)`
  align-items: end;
  background-color: ${({ theme }) => theme.palette.caption.main};
  border-radius: 4px;
  display: flex;
  height: 450px;
  justify-content: center;
  width: 600px;
`;

export const DownloaddButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.light} !important;
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.accent.main};
  font-weight: bold;
  padding: 10px 20px !important;
  text-decoration: none;
  width: 200px;
  :hover {
    background-color: ${({ theme }) => theme.palette.primary.dark} !important;
  }
`;

export const DownloadText = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.4rem;
  margin: 1.6rem 0 1.6rem 0;
`;
