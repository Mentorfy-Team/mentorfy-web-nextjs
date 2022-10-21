import Box  from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const Wrapper = styled(Box)`
    background-color: ${({theme}) => theme.palette.primary.light};
    border-radius: 4px;
    display: flex;
    max-width: 74%;
    padding: 1.3rem;
`;

export const Revenue = styled(Box)`
    background-image: url('/images/revenue-background.png');
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    padding: 1rem 0.5rem;
    text-align: left;
    width: 45%;
`;

export const RevenueTitle = styled(Typography)`
    font-size: 1rem;
    font-weight: 700;
    line-height: 110.52%;
`;

export const TextAmount = styled(Typography)`
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 110.52%;
    opacity: 0.7;
`;

export const Amount = styled(Typography)`
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 110.52%;
`;

export const BarWrapper = styled(Box)`
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 110.52%;
`;

export const BarLegend = styled(Typography)`
    color: ${({theme}) => theme.palette.caption.main};
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 110.52%;
`;

export const ProgressBar = styled(LinearProgress)`
    background-color: #D9D9D9;
    border-radius: 4px;
    height: 10px;
    margin: 0.5rem 0 1rem 0;

    .css-1hwbv1c-MuiLinearProgress-bar1 { 
        background: linear-gradient(89.97deg, #00F7E8 -3.62%, #00D73C 106.26%);
        border-radius: 4px;
    }
`;

