
import styled, {css} from 'styled-components';
import {BaseLabel, Logo} from '~/atoms';
import {pointer} from '~/styles';

export const Wrapper = styled.div`
  ${pointer()}
  align-self: center;
  display: flex;
`;

export const HLogo = styled(Logo)`
  align-self: center;
  height: 30px;
  margin-right: 10px;
  transition: ease .3s;
  width: 30px;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Title = styled(BaseLabel)`
  align-self: center;

  ${({theme}) => css`
    color: ${theme.colors.primary.contrast}
  `}
`;
