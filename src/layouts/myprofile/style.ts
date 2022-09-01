import { Box, TextField, styled } from '@mui/material';

export const Wrapper = styled('div')`
    background-color:  ${({ theme }) => theme.palette.primary.light};
    display: flex;
    flex-direction: column;

    gap: 1.5rem;
    padding: 0.625rem 1.5rem ; 
`;

export const Header = styled('header')`
`;

export const WrapperContent = styled(Box)`
    display: flex;
`;

export const Form = styled('form')`
    background-color: ${ ({theme}) => theme.palette.primary.main};
    border-radius: 0.5rem;
    
    display: flex;
    flex-direction: column;
    padding: 0.625rem 1.5rem ;
    width: 60%;
    
`;

export const InputField = styled(TextField)`
`;

export const TextWrapper = styled('div')`
    width: 40%;
`;

