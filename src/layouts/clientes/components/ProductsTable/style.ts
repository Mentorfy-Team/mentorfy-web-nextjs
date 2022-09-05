import { Box, styled } from '@mui/material';

export const ProductBox = styled(Box)`
    background: ${({theme}) => theme.palette.secondary.main};
    border-radius: 10px;
`;
