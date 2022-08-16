
import {FC} from 'react';

import {
 HLogo, Title, Wrapper,
} from './brand.styles';

const Brand: FC<Header.Brand.Props> = ({onClick}) => (
  <Wrapper onClick={onClick}>
    <HLogo />
    <Title>
      The Propless Architecture
    </Title>
  </Wrapper>
);

export default Brand;
