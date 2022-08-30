import { Tab, Tabs, styled } from '@mui/material';

export const TabWrapper = styled(Tabs)``;

export const TabItem = styled(Tab)`
    border-bottom: 3px solid transparent;
    border-top: 3px solid transparent;
    color: #FFFFFF;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;

    line-height: 14px; 

    text-transform: none;
    transition: 0.3s;

    &:focus { 
        border-bottom: 3px solid #7586EC
    }

`;
