import { Box, Button, styled } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

export const Grid = styled(Grid2)``;

export const Item = styled(Box)`
    align-items: flex-start;
    background-color: #29282D;
    display: flex;

    height: 8.875rem;
    justify-content: space-between;
    padding: 1.6875rem 2.3125rem;

    width: 23.75rem;
`;

export const GridWrapper = styled(Box)`
    display: flex;
    justify-content: center;

    margin-top: 3.75rem;
`;

export const TextWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const ButtonsWrapper = styled('div')`
    display: flex;
    flex-wrap: wrap;

    gap: 1.8125rem;

    justify-content: end;
    margin-top: 4.125rem;
 `;

export const ClientsOptionsButton = styled(Button)`
    align-items: center;
    display: flex;

    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    gap: 0.75rem;

    height: 2.8125rem;

    justify-content: center;
    line-height: 1rem;
    text-transform: none;

    width: 12.5rem;
`;
