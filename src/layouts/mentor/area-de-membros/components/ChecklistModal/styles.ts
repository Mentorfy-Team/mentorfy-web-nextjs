import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import InputField from '~/components/atoms/InputField';

export const TaskField = styled(InputField)`
    margin-left: 0.7rem;
    .css-1xk3vng-MuiInputBase-root-MuiOutlinedInput-root { 
        height: 2rem;
    }
`;

export const TaskWrapper = styled(Box)`
    align-items: center;
    display: flex;
`;

export const SaveButton = styled(Button)`
    background-color: ${({ theme }) => theme.palette.primary.main};
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
    margin-left: 0.3rem;
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
