import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const Wrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 10px;
  flex: 3;
  padding: 0 1rem;
  display: flex;
  align-items: center;
`;

export const Revenue = styled(Box)`
  background-image: url('/images/revenue-background.png');
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  padding: 1rem 1rem;
  text-align: left;
  width: 100%;
`;

export const RevenueTitle = styled(Typography)`
  font-size: 1rem;
  font-weight: 700;
  line-height: 110.52%;
`;

export const TextAmount = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 110.52%;
  color: ${({ theme }) => theme.palette.caption.main};
`;

export const Amount = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 110.52%;
`;

export const BarWrapper = styled(Box)`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 110.52%;
`;

export const ProgressBar = styled(LinearProgress)`
  background-color: ${({ theme }) => theme.palette.caption.light};;
  border-radius: 4px;
  height: 10px;
  margin: 0 0 1rem 0;

  .css-1hwbv1c-MuiLinearProgress-bar1 {
    background: ${({ theme }) => theme.palette.accent.main};
    border-radius: 4px;
  }
`;

export const MountainsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const TheMountainWrapper = styled(Box)`
  display: flex;
  align-items: end;
`;

export const MountainName = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 110.52%;
  color: ${({ theme }) => theme.palette.caption.main};

`;
