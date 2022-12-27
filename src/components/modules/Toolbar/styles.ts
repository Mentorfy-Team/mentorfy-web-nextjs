import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const LinkWrapper = styled(Box)`
  a {
    color: #fff;
    text-decoration: none;
    font-size: 0.8rem;
    transition: all 0.2s ease-in-out;
  }
`;

export const WhatsAppButton = styled(Box)`
  top: 0;
  margin-top: 5px;
  cursor: pointer;
  background-color: #098624;
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 0.2rem;
  &:hover {
    background-color: #076b1d;
  }
  // center
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  height: 32px;
`;

export const ActionButton = styled(Box)`
  right: 35;
  top: 0;
  height: 32px;
  margin-top: 5px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.accent.main};
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 0.2rem;
  &:hover {
    background-color: ${({ theme }) => theme.palette.accent.dark};
  }
  // center
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
`;
