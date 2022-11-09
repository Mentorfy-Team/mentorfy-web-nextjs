import { Document, PDFDownloadLink, Page } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { toPng } from 'html-to-image';
import Image from 'next/image';

type Props = {
  template: HTMLElement;
  pageStyles: Style;
  fileName: string;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
};

export default ({
  template,
  children,
  pageStyles,
  fileName,
  loadingComponent,
}: Props): JSX.Element => {
  // generate a pdf
  const Document = GenerateDocument(template, pageStyles);

  return (
    <PDFDownloadLink document={Document} fileName={fileName}>
      {({ blob, url, loading, error }) => {
        // TODO: handle error
        // TODO: handle doc ready
        return loading ? loadingComponent || 'Carregando...' : children;
      }}
    </PDFDownloadLink>
  );
};

const GenerateDocument = (template: HTMLElement, pageStyles: Style) => {

  const convertToImage = async () => {

   const pdfFile = await toPng(template);

   await function (dataUrl) {

     const img = new Image(pdfFile);
     img.src = dataUrl;
     document.body.appendChild(img);
   };
           };

  return (
    <Document>
      <Page size="A4" style={pageStyles}>
        <Image src={convertToImage} alt='pdf'/>
      </Page>
    </Document>
  );
};

// TODO: Converter html em imagem
// toPng(template)
//   .then(function (dataUrl) {
//       const img = new Image();
//       img.src = dataUrl;
//       document.body.appendChild(img);
//     });
