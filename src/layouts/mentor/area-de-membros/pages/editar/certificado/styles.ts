import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';

export const BpIcon = styled('span')`
  border: 1px solid #ffff;
  border-radius: 50%;
  height: 16px;
  width: 16px;
`;

export const BpCheckedIcon = styled('div')`
  align-items: center;
  background-image: url('/svgs/bp-checked-icon.svg');
  border-radius: 50%;
  display: flex;
  height: 16px;
  justify-content: center;
  width: 16px;
`;

export const CheckWrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.2rem 0;
  cursor: pointer;
`;

export const CheckText = styled(Typography)`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.2rem;
  opacity: 0.8;
`;

export const Label = styled('label')`
  align-items: center;
  background: none;
  border: 1px dotted ${({ theme }) => theme.palette.caption.main};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  height: 8rem;
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

export const UploadField = styled('div')`
  margin-bottom: 1.3rem;
`;

export const SaveButton = styled(LoadingButton)`
  svg {
    scale: 0.7;
  }
`;

export const ReturnButton = styled(Button)`
  height: 2.5rem;
  margin-left: 1px;
  padding: 0px;
  span {
    margin-left: 16.5px;
  }
  path {
    fill: ${({ theme }) => theme.palette.accent.main};
  }
`;
export const SvgWrapper = styled('div')`
  svg {
    margin-right: 8px;
    margin-top: 6px;
    scale: 0.7;
  }
`;

export const FileWrapper = styled('div')`
  background-color: ${({ theme }) => theme.palette.caption.main};
  border-radius: 6px;
  display: flex;
  justify-content: center;
  height: 450px;
  max-width: 100%;
  margin-bottom: 1rem;
`;
