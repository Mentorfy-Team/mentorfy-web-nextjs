import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
`;

export const CircleWrapper = styled(Box)`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30px;
`;

export const StepsWrapper = styled(Box)`
    align-items: center;
    display: flex;
    gap: 1.2rem;
    justify-content: center;
`;

export const BundleWrapper = styled(Box)`
    display: flex;
    gap: 1.2rem;
`;

export const CircleProgressBar = styled(CircularProgress)`
    background-color: transparent;
    border-radius: 100%;
    box-shadow: inset 0 0 0px 3px #363739;
    color: #5AC857;
`;

export const TextWrapper = styled(Box)`
    text-align: left;
    width: 160px;
`;

export const Title = styled(Typography)`
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.2rem;
`;

export const ClassesNumber = styled(Typography)`
    color: ${({theme}) => theme.palette.caption.main};
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 1rem;
    margin-top: 0.3rem;
`;

export const Line = styled(Box)`
    background-color: #363739;
    min-height: 30px;
    width: 1px;
`;

export const Dot = styled(Box)`
    background: none;
    border: 1px solid #363739;
    border-radius: 50%;
    height: 10px;
    width: 10px;
`;
