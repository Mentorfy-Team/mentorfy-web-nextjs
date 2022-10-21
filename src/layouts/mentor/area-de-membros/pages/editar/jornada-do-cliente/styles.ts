import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const ScrollArea = styled(Box)`
  align-items: flex-start;
  display: flex;
  gap: 2rem;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 1rem;
`;

export const Bundle = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 0 0 10px 10px;
  height: 458px;
  min-width: 342px;
`;

export const BundleHeader = styled(Box)`
  background-color: ${({ theme }) => theme.palette.caption.dark};
  display: flex;
  flex-direction: column;
  padding: 0.8rem 1.4rem;
`;

export const BundleAmount = styled(Typography)`
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 47px;
`;

export const BundleDescription = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 0.9rem;
  margin-top: 0.5rem;
`;

export const ImageWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  height: 95px;
  justify-content: center;
  width: 95px;
`;

export const ImageText = styled(Typography)`
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
`;

export const ClassWrapper = styled(Box)`
  height: 270px;
  overflow-y: auto;
  padding: 1.8rem 1.4rem;
  text-align: center;
`;

export const Class = styled(Box)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.9rem;
`;

export const ClassDescription = styled(Typography)`
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 0.9rem;
  opacity: 0.8;
`;
