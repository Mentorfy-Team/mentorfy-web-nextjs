import dynamic from 'next/dynamic';
const PDFReader = dynamic(
  () => import('~/components/atoms/PDFReader/PDFReader'),
  {
    ssr: false,
  },
);
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { SingFont } from '~/pages/_app';
import { DataText, FileWrapper, ForwardButton, Title } from './styles';
import CircularProgress from '@mui/material/CircularProgress';

const PDFDownload = dynamic(() => import('~/components/atoms/PDFDownload'), {
  ssr: false,
});

type Props = {
  product: ProductTypes.Product;
  certificate: ProductTypes.CertificateBuilder;
  open: boolean;
  user: UserTypes.ProfileWithAddress & UserTypes.User;
  setOpen: (value: boolean) => void;
};
const CertificateModal = ({
  open,
  setOpen,
  product,
  certificate: { course, student, title, url },
  user,
}: Props) => {
  const TextContent = ({ text, fontSize, position, sign = false }) => {
    const bSize = position.boxSize; // diff de 35px botão de aumentar fonte
    const threshold =
      position.pageX > 0 ? parseInt(position.pageX) : parseInt(position.pageX);
    const style = sign ? SingFont.style : {};
    return (
      <DataText
        sx={{
          fontSize: `${fontSize ? fontSize + 'px' : '14px'}`,
          top: `${parseInt(position.pageY) + 25}px`,
          left: `calc(50% + ${threshold}px)`,
          overflow: 'visible',
          width: '0px',
          whiteSpace: 'nowrap',
          display: 'flex',
          placeContent: 'center',
          lineHeight: 'normal',
          ...style,
        }}
      >
        <div>{text}</div>
      </DataText>
    );
  };

  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      title="Certificado de Conclusão"
    >
      <ModalDialogContent sx={{ paddingTop: '0.5rem' }}>
        <Title>{title}</Title>
        <FileWrapper >
          <div id="certificate_id">
            <PDFReader file={url} />
            {student?.name && (
              <TextContent
                fontSize={student?.name?.fontSize}
                position={student?.name}
                text={user?.profile.name}
              />
            )}
            {student?.document && (
              <TextContent
                fontSize={student?.document?.fontSize}
                position={student?.document}
                text={'012.345.678-90'}
              />
            )}
            {student?.finishedAt && (
              <TextContent
                fontSize={student?.finishedAt?.fontSize}
                position={student?.finishedAt}
                text={'12/12/2022'}
              />
            )}
            {course?.name && (
              <TextContent
                fontSize={course?.name?.fontSize}
                position={course?.name}
                text={product.title}
              />
            )}
            {course?.owner && (
              <TextContent
                fontSize={course?.owner?.fontSize}
                position={course?.owner}
                sign
                text={product.profile.name}
              />
            )}
          </div>
        </FileWrapper>
        <PDFDownload
          fileName="certificate.pdf"
          pageStyles={{}}
          loadingComponent={<CircularProgress color="success" />}
          template_id="certificate_id"
        >
          <ForwardButton variant="contained">Download</ForwardButton>
        </PDFDownload>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default CertificateModal;
