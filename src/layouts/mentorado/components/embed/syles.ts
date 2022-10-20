import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const CloseButton = styled(Button)`
    background-color: ${({theme}) => theme.palette.primary.light};
    color: ${({theme}) => theme.palette.accent.main};
    float: right;
    margin-top: 3.8rem;
    width: 200px;
`;
