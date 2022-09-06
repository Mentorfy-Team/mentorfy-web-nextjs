import { Box, Button, TextField, Typography, styled  } from '@mui/material';

export const Header = styled('header')`
    background-color:  ${({ theme }) => theme.palette.caption.dark};   
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

export const Form = styled('form')`
    align-items: flex-start;
    background-color:  ${({ theme }) => theme.palette.primary.light};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    flex-direction: column;
    
    .submit-button { 
        align-self: flex-end;
        margin-top: 1.5rem;
    }  
`;

export const InputField = styled(TextField)` 
    height: 2.8125rem;
    outline: none;

    width: 50%;
    input { 
        height: 0.625rem; 
    }
    label { 
        color: ${({theme}) => theme.palette.text.primary};
    }
    fieldset  { 
        border-color: ${({theme}) => theme.palette.text.primary} ;
        height: 2.8125rem;
    }
`;

export const CustomTypography = styled(Typography)`
    color: ${({theme}) => theme.palette.text.primary};
`;

export const AvatarWrapper = styled('div')`
    align-items: center;
    display: flex;
    gap: 1rem;

    justify-content: center;
    margin-top: -1rem;
`;

export const Buttons = styled(Button)`
    height: 2rem;
    text-transform: none;
`;

