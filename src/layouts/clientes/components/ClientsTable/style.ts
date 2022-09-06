import { Box,Typography, styled } from '@mui/material';

export const ProductBox = styled(Box)`
    background: ${({ theme }) => theme.palette.secondary.main};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    width: 7rem;
`;

export const P = styled(Typography)`
    float: right;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    opacity: 0.7;
`;

export const ArrowButton = styled('button')`
    background: none;
    border: none;
    color: ${({ theme }) => theme.palette.text.primary};
    cursor: pointer;
    outline: none;

    #Arrow { 
        width: 1rem;   
    }
`;
