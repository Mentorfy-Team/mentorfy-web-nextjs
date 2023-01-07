import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 0.75rem;
  margin: 1rem auto 0 0;
  margin-bottom: 0.5rem;
`;

export const AttachName = styled('p')`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 8px;
  font-weight: 400;
  line-height: 10px;
  margin-top: 0.3rem;
`;

export const UploadField = styled('div')`
  margin-bottom: 1.3rem;
`;

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
  width: 100%;
`;

