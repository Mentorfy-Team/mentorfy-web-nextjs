'use client';

import Box from '@mui/material/Box';
import { CollorFullTypography } from '~/layouts/mentorado/bem-vindo/style';

const TextBanner = (text, start, middle, end) => (
  <Box>
    <CollorFullTypography
      one={start || 'white'}
      two={middle || 'white'}
      three={end || 'white'}
    >
      {text}
    </CollorFullTypography>
  </Box>
);

export default TextBanner;
