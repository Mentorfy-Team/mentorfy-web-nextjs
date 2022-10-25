import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography  from '@mui/material/Typography';

export const Description = styled(Typography)`
    color: ${({theme}) => theme.palette.caption.main};
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.2rem;
    margin-bottom: 1rem;
    text-align: start;
`;

export const CloseButton = styled(Button)`
    background-color: ${({theme}) => theme.palette.primary.light};
    color: ${({theme}) => theme.palette.accent.main};
    float: right;
    margin-top: 3.8rem;
    width: 200px;
`;

export const OptionsWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 200px;
    margin-top: 3rem;
    overflow-y: auto;
`;

export const OptionsBox = styled(Box)`
    align-items: center;
    display: flex;
    gap: 0.5rem;
`;

export const OptionsText = styled(Typography)`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.2rem;
    opacity: 0.8;
`;

export const BpIcon = styled('span')`
    border: 1px solid #ffff;
    border-radius: 50%;    
    height: 18px;
    width: 18px
`;

export const BpCheckedIcon = styled('div')`
    align-items: center; 
    background-image: url('/svgs/bp-checked-icon.svg');
    border-radius: 50%;
    display: flex;
    height: 18px;
    justify-content: center;
    width: 18px;
`;

