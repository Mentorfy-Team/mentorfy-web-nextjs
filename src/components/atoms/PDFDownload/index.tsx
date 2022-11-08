import { Document, PDFDownloadLink, Page } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';

type Props = {
  template: React.ReactNode;
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

const GenerateDocument = (template: React.ReactNode, pageStyles: Style) => {
  const convertToImage = htmlToImage(template);
  return (
    <Document>
      <Page size="A4" style={pageStyles}>
        {convertToImage}
      </Page>
    </Document>
  );
};

// TODO: Converter html em imagem
const htmlToImage = (html: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = `data:image/svg+xml,${encodeURIComponent(html)}`;
  });
};
