
import styled, {css} from 'styled-components';

export const BaseLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: normal;

  ${({theme}) => css`
    color: ${theme.colors.text};
  `}
`;

export const PageTitle = styled(BaseLabel).attrs({
  as: 'h3',
})`
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 30px;
`;
