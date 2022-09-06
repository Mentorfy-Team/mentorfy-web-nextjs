import { Box, Button, TextField, Typography, styled  } from '@mui/material';

export const Wrapper = styled('div')`
    background-color:  ${({ theme }) => theme.palette.primary.light};
    display: flex;
    flex-direction: column;

    gap: 1.5rem;
    height: 100vh; 
    padding: 0.625rem 1.5rem ; 

    @media (max-width: 500px) { 
        height: 100%; 
    }
`;

export const Header = styled('header')`
`;

export const WrapperContent = styled(Box)`
    display: flex;
    @media (max-width: 500px) { 
        flex-direction: column;
    }
`;

export const Form = styled('form')`
    display: flex;
    flex-direction: column;
    width: 70%;
    .submit-button { 
        align-self: flex-end;
        margin-top: 1.5rem;
    }

    @media (max-width: 500px) { 
        width:100%;
        
    }  
`;

export const FormContentWrapper = styled(Box)`
    align-items: flex-start;
    background-color: ${ ({theme}) => theme.palette.primary.main};
    
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.7rem;
    height: 80vh;
    padding: 1.5rem;
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

export const TextWrapper = styled('div')`
    width: 30%;

    @media (max-width: 500px) { 
        width:100%;
        margin-bottom: 1rem;
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

export const ButtonInputWrapper = styled('div')`
    display:flex;
    flex-wrap: wrap;
    gap: 1rem;
    
    margin: 3rem 0;
    width: 100%;
   
`;
