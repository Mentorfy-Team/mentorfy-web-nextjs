import Box  from '@mui/material/Box';
import { css, styled } from '@mui/material/styles';
import Typography  from '@mui/material/Typography';

type Props = {
    isNegative?: boolean
}
export const IndicatorsWrapper = styled(Box)`
    display: flex;
    gap: 1.2rem;
    margin: 1.2rem 0;
`;

export const Indicator = styled(Box)`
    background-color: ${({theme}) => theme.palette.primary.light};
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    gap: 0.5rem;
    height: 118px;
    padding: 1.2rem 1.4rem ;
    width: 259px;
`;

export const IndicatorValue = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 110.52%;
`;

export const IndicatorPercent = styled(Typography)<Props>`
    color: ${({theme}) => theme.palette.failure.main};
    font-size: 16px;
    font-weight: 700;
    line-height: 110.52%;

    ${({isNegative}) => isNegative && css`
        color: #00D75B;
        `}
`;

export const IndicatorTitle = styled(Typography)<Props>`
    color: ${({theme}) => theme.palette.caption.main};
    font-size: 18px;
    font-weight: 500;
    line-height: 110.52%;
`;

export const ArrowBox = styled(Box)`
    background-color: #162F29;
    border-radius: 4px;
    display: flex;
    height: 48.78px;
    justify-content: center;
    width: 50px;
`;
