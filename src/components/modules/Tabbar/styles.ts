import { Tab, Tabs, styled } from '@mui/material';

export const TabWrapper = styled(Tabs)`
    * {
        color: white !important;
    }
    .Mui-selected {
        border-bottom: 3px solid #7586EC;
    }
    button { 
        align-items: flex-start;
        display: flex;
        margin-left: 1.1rem;
        padding: 0;
    }
`;

export const TabItem = styled(Tab)`
    border-bottom: 3px solid transparent;
    border-top: 3px solid transparent;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 500;

    line-height: 0.8rem; 

    text-transform: none;
    transition: 0.3s;

    &:focus { 
        border-bottom: 3px solid #7586EC
    }

`;
