import {
  Document,
  Image as ImageRP,
  PDFDownloadLink,
  Page,
} from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { toPng } from 'html-to-image';
import { useEffect, useState } from 'react';
import React from 'react';

type Props = {
  template_id: string;
  pageStyles: Style;
  fileName: string;
  children: React.ReactNode;
  loadingComponent?: any;
};

export default ({
  template_id,
  children,
  pageStyles,
  fileName,
  loadingComponent,
}: Props): JSX.Element => {
  const [pdfDocument, setPdfDocument] = useState<any>();
  // generate a pdf
  const GenerateDocument = async (template_id, pageStyles: Style) => {
    pageStyles = {
      ...pageStyles,
      padding: '25px',
      backgroundColor: '#121212',
    };

    toPng(document.getElementById(template_id)).then((dataUrl) => {
      setPdfDocument(
        <Document>
          <Page size="A4" style={pageStyles}>
            <ImageRP src={dataUrl} />
          </Page>
        </Document>,
      );
    });
  };

  // monitora e atualiza/roda a função de geração do pdf
  useEffect(() => {
    GenerateDocument(template_id, pageStyles);
  });

  return (
    <PDFDownloadLink document={pdfDocument} fileName={fileName}>
      {({ blob, url, loading, error }) => {
        // TODO: handle doc ready
        return children;
      }}
    </PDFDownloadLink>
  );
};

// TODO: Converter html em imagem
// toPng(template)
//   .then(function (dataUrl) {
//       const img = new Image();
//       img.src = dataUrl;
//       document.body.appendChild(img);
//     });
