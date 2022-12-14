import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
const PDFReader = dynamic(
  () => import('~/components/atoms/PDFReader/PDFReader'),
  {
    ssr: false,
  },
);
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { FileWrapper, Title } from './styles';

type Props = {
  product: ProductTypes.Certificate;
  open: boolean;
  setOpen: (value: boolean) => void;
};
const CertificateModal = ({ open, setOpen, product }: Props) => {
  const Name = (
    <Typography
      sx={{
        color: 'black',
        position: 'absolute',
        top: '220px',
        marginLeft: '-32px',
      }}
    >
      Henrique Francisco de Souza
    </Typography>
  );
  const Course = (
    <Typography
      sx={{
        color: 'black',
        position: 'absolute',
        top: `${product.course?.name.pageY}px`,
        marginRight: `${product.course?.name.pageX}px`,
      }}
    >
      Metodologia 5 em 1
    </Typography>
  );
  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      title="Certificado de Conclusão"
    >
      <ModalDialogContent sx={{ paddingTop: '0.5rem' }}>
        <Title>{product.title}</Title>
        <FileWrapper>
          <PDFReader file={product.url} />
          {Name}
          {Course}
        </FileWrapper>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default CertificateModal;
