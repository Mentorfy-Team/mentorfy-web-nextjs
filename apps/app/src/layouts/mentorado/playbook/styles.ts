import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const Wrapper = styled(Box)`
  display: flex;
  gap: 1rem;
`;

export const SideBar = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 5px;
  height: 100%;
  max-width: 20rem;
  overflow-y: auto;
  padding: 1rem;
  width: 100%;
`;
export const SideBarTitle = styled(Box)`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.success.main};
  border-radius: 6px;
  display: flex;
  height: 34.62px;
  justify-content: center;
  width: 224.89px;
`;

export const Banner = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.dark};
  height: 200px;
`;

export const Tips = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.2rem 0;
`;

export const Content = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 5px;
  cursor: pointer;
  height: 16rem;
  padding: 1.4rem;
  text-align: start;
  width: 20.2rem;
`;

export const DescriptionText = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 14px;
  font-weight: 400;
  height: calc(100% - 30px);
  line-height: 17px;
  margin-bottom: 1rem;
  overflow-y: auto;
`;
