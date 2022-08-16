
import styled, {css} from 'styled-components';
import {BaseLabel} from '~/atoms';
import {pointer} from '~/styles';

export const Wrapper = styled.div`
  display: flex;
  height: 70px;
  justify-content: space-between;
  padding: 0 20px;

  ${({theme}) => css`
    background-color: ${theme.colors.primary.main};
  `}
`;

export const LinkWrapper = styled.div`
  align-self: center;
  display: flex;
`;

export const Link = styled(BaseLabel)`
  ${pointer()}
  align-self: center;
  color: white;
  font-size: 14px;
  margin-right: 20px;
  
  &:last-child {
    margin-right: 0;
  }

  ${({theme}) => css`
    color: ${theme.colors.primary.contrast}
  `}
`;
