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
    height: 11rem;
    justify-content: center;
    width: 100%;
    
    &:hover { 
        border: 1px dotted ${({theme}) => theme.palette.text.primary} ;
    }
`;

export const UploadTypography = styled(Typography)`
    color: ${({theme}) => theme.palette.caption.main} ;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1rem;
    margin-top: 0.75rem;
`;

export const P = styled('p')`
    color: ${({theme}) => theme.palette.caption.dark};
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 0.75rem;
`;

export const CustomTypography = styled(Typography)`
    font-size: 0.7rem;
    font-weight: 400;
    line-height: 0.75rem;
    margin-bottom: 0.5rem;
`;

export const AttachName = styled('p')`
    color: ${({theme}) => theme.palette.caption.main};
    font-size: 8px;
    font-weight: 400;
    line-height: 10px;
`;

