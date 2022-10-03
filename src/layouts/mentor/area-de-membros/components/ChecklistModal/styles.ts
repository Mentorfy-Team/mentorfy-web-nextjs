import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import InputField from '~/components/atoms/InputField';

export const TaskField = styled(InputField)`
    border: none;
    margin-left: 0.7rem;
    .css-1xk3vng-MuiInputBase-root-MuiOutlinedInput-root { 
        height: 2rem;
    }
`;

export const SubTaskField = styled(InputField)`
    width: 72%;
    .css-1xk3vng-MuiInputBase-root-MuiOutlinedInput-root { 
        height: 2rem;
    }
`;

export const TaskWrapper = styled(Box)`
    align-items: center;
    display: flex;
    margin-bottom: 0.5rem;
`;

export const SaveButton = styled(Button)`
    background-color: ${({ theme }) => theme.palette.primary.main};
    font-size: 0.6rem;
    font-weight: 400;
    line-height: 0.8rem;
    margin-left: 0.3rem;
    min-width: 49px;
    padding: 0;
`;

export const DeleteButton = styled(Button)`
    background-color: none;
    color: ${({ theme }) => theme.palette.caption.main};
    font-size: 0.6rem;
    font-weight: 400;
    line-height: 0.8rem;
    min-width: 49px;
    padding: 0;
`;

export const AddSTButton = styled(Button)`
    color: ${({theme}) => theme.palette.caption.main};
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 0.9rem;
    text-transform: none;
`;

export const SubTask = styled(Box)`
    align-items: center;
    border-bottom: 1px solid #424242;
    display: flex;
    
`;

export const TaskTypography = styled(Typography)`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1rem;
    margin-left: 0.7rem;
    padding: 0.6rem 0 ;
    width: 80%;
`;

export const SubTaskTypography = styled(Typography)`
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1rem;
    margin: 0.8rem 0 0.8rem 0.2rem;
    margin-left: 0.7rem;
    width: 85%;
`;
