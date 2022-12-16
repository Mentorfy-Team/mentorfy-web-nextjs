import dynamic from 'next/dynamic';
const PDFReader = dynamic(
  () => import('~/components/atoms/PDFReader/PDFReader'),
  {
    ssr: false,
  },
);
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import { DataText, FileWrapper, Title } from './styles';

type Props = {
  product: ProductTypes.Product;
  certificate: ProductTypes.Certificate;
  open: boolean;
  user: UserTypes.ProfileWithAddress & UserTypes.User;
  setOpen: (value: boolean) => void;
};
const CertificateModal = ({ open, setOpen, product, certificate, user }: Props) => {

  const studentName = (
    <DataText
      sx={{
        fontSize: `${certificate?.student?.name?.fontSize ? certificate?.student?.name?.fontSize + 'px' : '14px'}`,
        top: `${certificate?.student?.name.pageY}px`,
        marginLeft: `${certificate?.student?.name.pageX}px`
      }}>
      {user?.profile.name}
    </DataText>
  );
  const studentDocument = (
    <DataText
      sx={{
        fontSize: `${certificate?.student?.document?.fontSize ? certificate?.student.document?.fontSize + 'px' : '14px'}`,
        top: `${certificate?.student?.document?.pageY}px`,
        marginLeft: `${certificate?.student?.document?.pageX}px`
      }}>
      12/12/2022
    </DataText>
  );
  const studentFinishDate = (
    <DataText
      sx={{
        fontSize: `${certificate?.student?.finishedAt?.fontSize ? certificate?.student?.finishedAt?.fontSize + 'px' : '14px'}`,
        top: `${certificate?.student?.finishedAt?.pageY}px`,
        marginLeft: `${certificate?.student?.finishedAt?.pageX}px`
      }}>
      12/12/2022
    </DataText>
  );
  const courseName = (
    <DataText
      sx={{
        fontSize: `${certificate?.course?.name?.fontSize ? certificate?.course?.name?.fontSize + 'px' : '14px'}`,
        top: `${certificate?.course?.courseName?.pageY}px`,
        marginLeft: `${certificate?.course?.courseName?.pageX}px`
      }}
    >
      {product.title}
    </DataText>
  );
  const mentorName = (
    <DataText
      sx={{
        fontSize: `${certificate?.course?.mentorName?.fontSize ? certificate?.course?.mentorName?.fontSize + 'px' : '14px'}`,
        top: `${certificate?.course?.mentorName?.pageY}px`,
        marginLeft: `${certificate?.course?.mentorName?.pageX}px`
      }}
    >
      Metodologia 5 em 1
    </DataText>
  );
  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      title="Certificado de Conclusão"
    >
      <ModalDialogContent sx={{ paddingTop: '0.5rem' }}>
        <Title>{certificate?.title}</Title>
        <FileWrapper>
          <PDFReader file={certificate?.url} />
          {certificate.student?.name && studentName}
          {certificate.student?.document && studentDocument}
          {certificate.student?.finishedAt && studentFinishDate}
          {certificate.course?.courseName && courseName}
          {certificate.course?.mentorName && mentorName}
        </FileWrapper>
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default CertificateModal;
