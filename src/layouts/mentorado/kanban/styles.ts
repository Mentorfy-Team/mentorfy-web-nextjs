import Box  from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography  from '@mui/material/Typography';

export const Wrapper = styled(Box)`
    display: flex;
    gap: 1.3rem;
    overflow: auto;
    width: 100%;
`;

export const Step = styled(Box)`
    align-items: center;
    background-color: ${({theme}) => theme.palette.primary.light};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    height: 38rem;
    min-width: 24rem;
    padding: 1rem 1.5rem;
`;

export const Description = styled(Typography)`
    color: ${({theme}) => theme.palette.caption.main};
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.2rem;
    margin: 3rem 0 3rem 0;
    text-align: start;
`;

export const Task = styled(Box)`
    background-color: ${({theme}) => theme.palette.primary.main};
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.6rem;
    padding: 0.5rem 1rem;
`;

export const TasktTitle = styled(Typography)`
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1rem;
`;
