
import {styled} from '@stitches/react';

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

export const Title = styled('title');

export const Meta = styled('meta', {
  name: 'viewport',
  content: 'width=device-width, initial-scale=1',
});

export const PageWrapper = styled('div', {
  minHeight: 'calc(100vh - 70px)',
  padding: '30px 20px',
});
