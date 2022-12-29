import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const Wrapper = styled(Box)`
    align-items: center;
    display: flex;
    gap: 3rem;
`;

export const LegendWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const LegendItem = styled(Box)`
    display: flex;
    gap: 0.5rem;
`;

export const LegendColor = styled(Box)`
    border-radius: 50%;
    height: 12px;
    width: 12px;
`;

export const LegendText = styled(Typography)`
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 110.52%;
`;

export const LegendValue = styled(Typography)`
    color: ${({theme}) => theme.palette.caption.main};
    font-size: 1rem;
    font-weight: 700;
    line-height: 110.52%; 
`;

