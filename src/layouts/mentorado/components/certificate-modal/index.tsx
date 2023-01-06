import Box from '@mui/material/Box';
import { useState } from 'react';
import FormInput from '~/components/atoms/FormInput';
import ModalComponent from '~/components/modules/Modal';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { FormProvider, useForm } from 'react-hook-form';
import { PDFButton } from './styles';
import { LinkWrapper } from '~/components/modules/Toolbar/styles';
type Props = {
  product: ProductTypes.Product;
  open: boolean;
  setOpen: (value: boolean) => void;
  profile: any;
};
const CertificateModal = ({ open, setOpen, product, profile }: Props) => {
  const withDoc = !!(product.certificate as any)?.student?.document?.pageX;
  const [document, setDocument] = useState<string | null>(null);

  const methods = useForm<any>({});

  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      title="Emissão de Certificado"
    >
      <Box
        sx={{
          width: '600px',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
        }}
        p={2}
      >
        <FormProvider {...methods}>
          <FormInput
            name="document"
            value={document}
            onChange={(e) => {
              // only numbers
              const value = e.target.value.replace(/\D/g, '');
              setDocument(value);
            }}
            type="text"
            required
            placeholder="00000000000"
            label="Documento para emissão do certificado"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormProvider>
        <LinkWrapper
          sx={{
            alignSelf: 'center',
          }}
          mt={2}
        >
          {document?.length > 5 && (
            <PDFButton
              as="a"
              href={`${process.env.NEXT_PUBLIC_API_URL}/${
                ApiRoutes.member_areas_certificate
              }?pid=${product.id}&cid=${profile.id}${
                withDoc ? `&doc=${document}` : ''
              }`}
              onClick={() => setOpen(false)}
            >
              Download do Certificado
            </PDFButton>
          )}
        </LinkWrapper>
      </Box>
    </ModalComponent>
  );
};

export default CertificateModal;
