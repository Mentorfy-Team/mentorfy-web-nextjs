import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  float: center;
  gap: 2rem;
  margin: 1rem 0 1rem 21%;
  overflow: auto;
  width: 800px;
`;

export const CircleWrapper = styled(Box)`
  align-items: center;
  display: flex;
`;

export const StepsWrapper = styled(Box)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 0.5rem;
  max-height: 45px;

  :hover {
    opacity: 0.8;
  }

  .active {
    color: ${({ theme }) => theme.palette.accent.main};
  }
  .active-background {
    background-color: ${({ theme }) => theme.palette.accent.main};
  }
`;

export const BundleWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

export const CircleProgressBar = styled(CircularProgress)`
  background-color: transparent;
  border-radius: 100%;
  box-shadow: inset 0 0 0px 3px #363739;
  color: #5ac857;
`;

export const TextWrapper = styled(Box)`
  text-align: center;
  width: 160px;
`;
export const TitleWrapper = styled(Box)`
  text-align: left;
  width: 160px;
`;

export const Title = styled(Typography)`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2rem;
`;

export const ClassesNumber = styled(Typography)`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: ${({ theme }) => theme.palette.caption.main};
  display: -webkit-box;
  font-size: 0.8rem;

  font-weight: 600;
  line-clamp: 2;
  line-height: 1rem;
  margin-top: 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Line = styled(Box)`
  background-color: #363739;
  min-height: 1px;
  width: 75px;
`;

export const Dot = styled(Box)`
  background: none;
  border: 1px solid #363739;
  border-radius: 50%;
  height: 10px;
  width: 10px;
`;
