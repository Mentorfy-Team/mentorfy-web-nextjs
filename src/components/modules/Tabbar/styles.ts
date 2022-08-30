import { Tab, Tabs, styled } from '@mui/material';

export const TabWrapper = styled(Tabs)`
    .Mui-selected {
        border-bottom: 3px solid #7586EC;
        color: white;
    }
`;

export const TabItem = styled(Tab)`
    border-bottom: 3px solid transparent;
    border-top: 3px solid transparent;
    color: #FFFFFF;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;

    line-height: 0.875rem; 

    text-transform: none;
    transition: 0.3s;

    &:focus { 
        border-bottom: 3px solid #7586EC
    }

`;
