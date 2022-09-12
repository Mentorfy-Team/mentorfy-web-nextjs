import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const LinearProgressBar = styled(LinearProgress)`
    background-color: ${({ theme }) => theme.palette.primary.main};
    border-radius: 5px;
    height: 0.75rem;
    transform: none;
    
    .css-1ek9033-MuiLinearProgress-bar1 { 
        background-color: ${({ theme }) => theme.palette.accent.main};
        background-image: url('./svgs/star.svg');
        border-radius: 5px;

    }
`;

export const CourseBox = styled(Box)`
    border-radius: 5px;
    cursor: pointer;
    height: 24.3rem;
    margin-right: 1.3rem;
    overflow: hidden;
    width: 19rem;

    &:hover { 
        border: 2px solid white;   
    }
`;

export const BannerBox = styled(Box)`
    background-image: url('/images/banner.png');
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 23rem;
    max-width: 71.2rem;
    padding: 1.6rem 0 4.7rem 2.5rem;

    @media (max-width: 500px) { 
        display: none;
    }
`;

export const RatingBox = styled(Box)`
    display: flex;
    gap: 1rem;
    .css-1c99szj-MuiRating-icon { 
        color: inherit;
    }
`;

export const CustomTypography = styled(Typography)`
    color: ${({ theme }) => theme.palette.caption.main};
    font-size: 1rem;
    font-style: normal;
    font-weight: 500; 
`;

export const CollorFullTypography = styled(Typography)`
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background: linear-gradient(40.22deg, #1774FF 22.52%, #9F12E1 50.99%, #FF0B0B 76.9%);
    background-clip: text;

    font-size: 2.5rem;
    font-style: normal;
    font-weight: 900;
    line-height: 3rem;

    text-align: start;
    text-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
`;
