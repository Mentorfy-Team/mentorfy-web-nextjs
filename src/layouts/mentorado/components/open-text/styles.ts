import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography  from '@mui/material/Typography';

export const Description = styled(Typography)`
    color: ${({theme}) => theme.palette.caption.main};
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.2rem;
    margin-bottom: 1rem;
    text-align: start;
`;

export const CloseButton = styled(Button)`
    background-color: ${({theme}) => theme.palette.primary.light};
    color: ${({theme}) => theme.palette.accent.main};
    float: right;
    margin-top: 3.8rem;
    width: 200px;
`;
