import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const QuestionsBox = styled(Box)`
    background-color: ${({theme}) => theme.palette.primary.dark};
    border-radius: 5px;
    height: 227px;
    padding: 0.7rem;
    
`;

export const QuestionInput = styled('input')`
    background-color: inherit;
    border: 1px solid gray;
    border-radius: 2px;
    color: ${({theme}) => theme.palette.text.primary};
    font-size: 1rem;
    margin-left: 1rem;
    width: 100%;
`;

export const Question = styled(Box)`
    align-items: center;
    border-bottom: 1px solid ${({theme}) => theme.palette.primary.light};
    display: flex;
    height: 2rem;
    margin-bottom: 1rem;
    padding: 0 0.5rem;
`;
