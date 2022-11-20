import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const FileWrapper = styled(Box)`

  background-color: ${({ theme }) => theme.palette.caption.main};
  border-radius: 4px;
  display: flex;
  height: 450px;
  justify-content: center;
  max-height: 450px;
  max-width: 100%;
`;

export const Description = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  text-align: start;
`;

export const DownloaddButton = styled(Button)<{
  target: any;
  rel: any;
  download: any;
}>`
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
