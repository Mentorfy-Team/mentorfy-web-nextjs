import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {styled }from '@mui/material/styles';

export const LinearProgressBar = styled(LinearProgress)`
    background-color: ${({theme}) => theme.palette.primary.main};
    border-radius: 5px;
    height: 0.75rem;
    transform: none;
    
    .css-1ek9033-MuiLinearProgress-bar1 { 
        background-color: ${({theme}) => theme.palette.accent.main};
        background-image: url('./svgs/star.svg');
        border-radius: 5px;

    }
`;

export const CourseBox = styled(Box)`
    border-radius: 5px;
    cursor: pointer;
    height: 25rem;
    margin-right: 1.3rem;
    width: 19rem;

    &:hover { 
        border: 2px solid white;   
    }
`;
