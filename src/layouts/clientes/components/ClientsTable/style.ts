import { Box, styled } from '@mui/material';

export const ProductBox = styled(Box)`
    background: ${({theme}) => theme.palette.secondary.main};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    width: 7rem;
`;
