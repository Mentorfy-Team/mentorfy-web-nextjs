import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const UploadInput = styled('input')`
  display: none;
`;

export const Label = styled('label')`
  align-items: center;
  background: none;
  border: 1px dotted ${({ theme }) => theme.palette.caption.main};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  height: 11rem;
  justify-content: center;
  margin-top: 0.7rem;
  width: 100%;

  &:hover {
    border: 1px dotted ${({ theme }) => theme.palette.text.primary};
  }
`;

export const UploadTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1rem;
  margin-top: 0.75rem;
`;

export const P = styled('p')`
  color: ${({ theme }) => theme.palette.caption.dark};
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 0.75rem;
  margin-top: 0.3rem;
`;

export const CustomTypography = styled(Typography)`
  font-size: 0.7rem;
  font-weight: 400;
  line-height: 0.75rem;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
`;

export const AttachName = styled('p')`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 8px;
  font-weight: 400;
  line-height: 10px;
  margin-top: 0.3rem;
`;

export const UploadField = styled('div')``;

export const RemoveBox = styled(Box)`
  background: ${({ theme }) => theme.palette.error.main};
  border-radius: 50%;
  cursor: pointer;
  height: 1.2rem;
  opacity: 0.7;
  position: absolute;
  right: -4px;
  top: -4px;
  width: 1.2rem;
`;

export const FilesWrapper = styled(Box)`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
`;

export const DriveButton = styled(Button)`
  border: 1px dashed rgba(125, 125, 125, 0.4);
  font-size: 12px;

  font-weight: 600;
  height: 24px;
  line-height: 15px;

  margin-top: 25px;
  width: 128.67px;
`;

export const GoogleDrive = styled('p')`
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background: linear-gradient(
    90deg,
    #4b8cef 6.67%,
    #eb6767 24.45%,
    #e6e283 42.05%,
    #4b8cef 60.18%,
    #52a85a 77.26%,
    #eb6767 95.33%
  );

  background-clip: text;
  color: transparent;
  font-size: 12px;
  font-weight: 600;
  line-height: 15px;
`;
