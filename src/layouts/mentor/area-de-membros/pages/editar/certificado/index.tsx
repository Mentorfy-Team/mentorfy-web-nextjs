import ChavronLeftSvg from '~/../public/svgs/chavron-left';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import Save from '@mui/icons-material/Save';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { MentorRoutes } from '~/consts';
import { useState } from 'react';
import InputField from '~/components/atoms/InputField';
import HandleFileUpload from '~/helpers/HandleFileUpload';

import {
  BpCheckedIcon,
  BpIcon,
  CheckText,
  CheckWrapper,
  FileWrapper,
  Label,
  P,
  ReturnButton,
  SaveButton,
  SvgWrapper,
  UploadField,
  UploadTypography,
} from './styles';
import { useTheme } from '@mui/material/styles';
import DropzoneComponent from '~/components/modules/Dropzone';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FileType } from '../../../components/UploadFileModal';

const PDFReader = dynamic(
  () => import('~/components/atoms/PDFReader/PDFReader'),
  {
    ssr: false,
  },
);

const Certificate = ({ id }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const route = useRouter();
  const [title, setTitle] = useState<string>('');
  const [color, setColor] = useState(false);
  const theme = useTheme();
  const [files, setFiles] = useState<FileType[]>([]);

  function BpCheckbox(props: CheckboxProps) {
    return (
      <Checkbox
        sx={{
          padding: '0',
          color: `${theme.palette.text.primary}`,
        }}
        disableRipple
        icon={<BpIcon />}
        checkedIcon={<BpCheckedIcon />}
        checked={color}
        color="default"
        onChange={(e) => (e.target.checked ? setColor(true) : setColor(false))}
        {...props}
      />
    );
  }

  const handleUpload = (_files: any) => {
    HandleFileUpload(_files, (file) => {
      setFiles(file);
    });
    console.log(files ? 'Tem arquivo' : 'nÃO TEM ARQUIVO');
  };

  // const onSubmit = useCallback(() => {});

  return (
    <form onSubmit={() => {}}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        pb={2}
      >
        <ReturnButton
          color="primary"
          onClick={() => route.push(MentorRoutes.products)}
        >
          <ChavronLeftSvg />
          <span>Voltar</span>
        </ReturnButton>
        <SaveButton
          variant="outlined"
          color="primary"
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          <SvgWrapper>
            <Save />
          </SvgWrapper>
          Salvar alterações
        </SaveButton>
      </Box>
      <InputField
        color="secondary"
        value={title}
        label="Título"
        required={true}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setTitle(e.target.value)}
      />
      <CheckWrapper
        onClick={() => {
          setColor(!color);
          setFiles([]);
        }}
      >
        <BpCheckbox />
        <CheckText sx={{ color: `${color && '#7DDC51'}` }}>
          Usar certificado Mentorfy
        </CheckText>
      </CheckWrapper>

      {color ? null : (
        <>
          <DropzoneComponent onDrop={(_files) => handleUpload(_files)}>
            <UploadField>
              <Label>
                <Image
                  alt="upload"
                  width={58}
                  height={39}
                  src="/svgs/upload.svg"
                />
                <UploadTypography>
                  Solte o arquivo para fazer upload
                </UploadTypography>
                <P>Tamanho máximo de 40mb (No momento, apenas PDF) </P>
              </Label>
            </UploadField>
          </DropzoneComponent>
        </>
      )}
      {files && files[0].data && (
        <FileWrapper>
          <PDFReader file={files[0].data} />
        </FileWrapper>
      )}
    </form>
  );
};

export default Certificate;
