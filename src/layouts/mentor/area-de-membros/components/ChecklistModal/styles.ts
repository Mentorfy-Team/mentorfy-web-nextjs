import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';

export const ContentBox = styled(Box)`
    background-color: ${({theme}) => theme.palette.primary.dark};
    border-radius: 5px;
    height: 227px;
    overflow: auto;
    padding: 0.7rem 1rem;
`;
