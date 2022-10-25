import React from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { Wrapper } from './styles';

export default ({ file }) => {
  return (
    <Wrapper>
      <Document file={file}>
        <Page pageNumber={1} />
      </Document>
    </Wrapper>
  );
};
