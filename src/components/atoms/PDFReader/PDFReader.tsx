import { useMediaQuery } from '@mui/material';
import React from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { Wrapper } from './styles';

const PDFReader = ({ file }) => {
  const sizeLg = useMediaQuery('(min-width: 1200px)');
  const sizeSm = useMediaQuery('(min-width: 500px)');
  return (
    <Wrapper>
      <Document file={file}>
        <Page
          pageIndex={0}
          width={600}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </Wrapper>
  );
};

export default PDFReader;
