import Box from '@mui/material/Box';
import Image from 'next/image';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import ModalComponent from '~/components/modules/Modal';
import {
  AttachName,
  CustomTypography,
  DriveButton,
  GoogleDrive,
  Label,
  P,
  UploadInput,
  UploadTypography,
} from './styles';

const FilesUploadModal = ({ open, setOpen }) => {
  return (
    <ModalComponent open={open} setOpen={setOpen} title="Upload de Arquivos">
      <>
        <DescriptionInputField
          label="Descrição"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum facilisis in lobortis orci aliquet. In nisl elit sodales morbi euismod ullamcorper egestas aenean amet. Gravida penatibus massa, duis felis. Vitae, pellentesque eget nunc facilisi in dictumst. Malesuada sed condimentum viverra vel pellentesque magna."
        ></DescriptionInputField>
        <Box sx={{ marginBottom: '1.3rem' }}>
          <Label htmlFor="arquivo">
            <Image alt="upload" width={58} height={39} src="/svgs/upload.svg" />
            <UploadTypography>
              Solte os arquivos para fazer upload
            </UploadTypography>
            <P>Tamanho máximo de 500mb por arquivo</P>
            <DriveButton>
              <GoogleDrive>Google Drive</GoogleDrive>
            </DriveButton>
          </Label>
          <UploadInput type="file" name="arquivo" id="arquivo"></UploadInput>
        </Box>
        <CustomTypography>Anexados (1)</CustomTypography>
        <Box>
          <Box width={54}>
            <Image
              alt=""
              width={54}
              height={46}
              src="/svgs/attached-product.svg"
            />
            <AttachName>placeholder-image.png</AttachName>
          </Box>
        </Box>
      </>
    </ModalComponent>
  );
};

export default FilesUploadModal;
