import { Box, Button, TextField, Typography, styled  } from '@mui/material';

export const Header = styled('header')`
    background-color:  ${({ theme }) => theme.palette.caption.dark};   
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 0.5rem 0;
`;

export const InputField = styled(TextField)` 
    height: 2.8125rem;
    outline: none;

    width: 100%;
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
    
`;

export const AvatarWrapper = styled('div')`
    align-items: center;
    display: flex;
    gap: 1rem;

    justify-content: center;
    
`;

export const Buttons = styled(Button)`
    font-size: 0.8rem;
    font-weight: 500;
    height: 0rem;
    min-width: 0px;
    padding: 0;
    text-transform: none;
`;

export const Form = styled('form')`
    align-items: flex-start;
    background-color:  ${({ theme }) => theme.palette.primary.light};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;

    .submit-button { 
        align-self: flex-end;
        height: 2rem;
        margin-top: 1.5rem;
        padding: 0.1rem 1rem;
    }  
`;

export const BOX = styled(Box)`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

