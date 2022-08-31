import { Box, styled } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

export const Grid = styled(Grid2)``;

export const Item = styled(Box)`
    background-color: #29282D;
    display: flex;
    height: 142px;

    justify-content: space-between;
    padding: 27px 37px;

    width: 342px;
`;

export const GridWrapper = styled(Box)`
    display: flex;
    justify-content: center;

    margin-top: 3.75rem;
`;

export const TextWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
