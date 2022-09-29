import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';

export const ContentBox = styled(Box)`
background-color: ${({theme}) => theme.palette.primary.dark};
border-radius: 5px;
height: 227px;
overflow: auto;
padding: 0.7rem 0.5rem;
`;

export const AreasBox = styled(Box)`
    align-items: center;
    border-bottom: 1px solid #6e6e6e55;
    display: flex;
    float: right;
    gap: 0.5rem;
    margin-bottom: 0.8rem;
    padding: 0 0 0.2rem 0;
    width: 90%;
`;
