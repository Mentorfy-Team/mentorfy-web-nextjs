import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const UploadInput = styled('input')`
    display: none;
`;

export const Label = styled('label')`
    align-items: center;
    background: none;
    border: 1px dotted ${({theme}) => theme.palette.caption.main} ;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    height: 175px;
    justify-content: center;
    width: 100%;
    
    &:hover { 
        border: 1px dotted ${({theme}) => theme.palette.text.primary} ;
    }
`;

export const UploadTypography = styled(Typography)`
    color: ${({theme}) => theme.palette.caption.main} ;
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
    margin-top: 0.75rem;
`;

export const P = styled('p')`
    color: ${({theme}) => theme.palette.caption.dark};
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
`;