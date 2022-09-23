import React from 'react';
import Image from 'next/future/image';
import { AppBar } from './styles';
import Tipografia from '~/../public/images/tipografia.png';

const HeaderPartial: React.FC = () => {
  return (
    <AppBar id="Header" position="fixed">
      <Image
        style={{
          marginLeft: '2rem',
        }}
        height={30}
        alt="some important man mentoring smart people"
        src={Tipografia}
        quality={100}
        placeholder="blur"
      />
    </AppBar>
  );
};

export default HeaderPartial;
