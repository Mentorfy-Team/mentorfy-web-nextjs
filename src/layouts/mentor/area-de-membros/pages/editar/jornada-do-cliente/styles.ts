import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const ScrollArea = styled(Box)`
  align-items: flex-start;
  display: flex;
  gap: 1rem;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 1rem;
`;

export const Bundle = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 0 0 4px 4px;
  min-width: 340px;
  overflow: hidden;
`;

export const BundleHeader = styled(Box)`
  background-color: ${({ theme }) => theme.palette.caption.dark};
  display: flex;
  flex-direction: column;
  max-width: 340px;
  padding: 0.8rem 1rem;
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
  height: 65px;
  justify-content: center;
  width: 65px;
  & > img {
    align-self: center;
  }
`;

export const ImageText = styled(Typography)`
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  // add dots if text is too long
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 180px;
`;

export const ClassWrapper = styled(Box)`
  height: 100%;
  max-width: 340px;
  overflow-y: auto;
  padding: 0.7rem 1.2rem 0.5rem;
  text-align: center;
`;

export const Class = styled(Box)`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.caption.dark}55;
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.45rem;
  padding-top: 0.45rem;

  :hover {
    background-color: ${({ theme }) => theme.palette.caption.dark}55;
    cursor: pointer;
  }
`;

export const ClassDescription = styled(Typography)`
  display: flex;
  gap: 0.3rem;
  padding-left: 0.5rem;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 0.9rem;
  opacity: 0.8;
  // add three dots if text is too long
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: max-content;
  max-width: 220px;
`;
