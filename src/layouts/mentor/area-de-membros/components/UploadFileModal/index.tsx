import Box from '@mui/material/Box';
import { Close } from '@mui/icons-material';
import Image from 'next/image';
import { useState } from 'react';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import {
  AttachName,
  CustomTypography,
  DriveButton,
  FilesWrapper,
  GoogleDrive,
  Label,
  P,
  RemoveBox,
  UploadField,
  UploadInput,
  UploadTypography,
} from './styles';
import HandleFileUpload from '~/helpers/HandleFileUpload';
import { ActionButton } from '~/layouts/mentor/produtos/pages/styles';
import UploadToUrlFiles from './helpers/UploadToUrlFiles';

export type FileType = {
  name: string;
  id?: string;
  sourceUrl?: string;
  imageUrl?: string;
  size: number;
  data: string;
  type: string;
}

const FilesUploadModal = ({ 
  open, 
  setOpen,
  onChange,
  data: { title: titleData, description: descriptionData, data: filesData },
 }) => {
  const [title, setTitle] = useState(titleData);
  const [description, setDescription] = useState(descriptionData);

  const [files, setFiles] = useState<FileType[]>(filesData ||
    [{
      name: 'teste.pdf',
      sourceUrl: "/svgs/attached-product.svg",
      imageUrl: "/svgs/attached-product.svg",
      id: '1',
    }]
  );

  const handleRemoveFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
  }

  const handleSave = (del?: boolean) => {
    
    const convertedFiles = UploadToUrlFiles(files);

    onChange({
      title,
      description,
      data: convertedFiles,
      delete: del,
    });
    setOpen(false);
  };
  
  const handleUpload = (target: any) => {
    const files:FileType[] = HandleFileUpload(target);
    setFiles(files);
  }
  
  return (
    <ModalComponent onDelete={()=>handleSave(true)} onSave={()=>handleSave()} open={open} setOpen={setOpen} title="Upload de Arquivos">
      <>
        <InputField
          label="Título"
          placeholder="Digite o título da etapa"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <DescriptionInputField
          label="Descrição"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Dê uma descrição para essa etapa"
        ></DescriptionInputField>
        <UploadField as='label' onChange={(e)=>handleUpload(e.target)} sx={{ marginBottom: '1.3rem' }}>
          <Label >
            <input hidden multiple accept="image/*,.pdf,.doc,.docx,.csv,.xml,.xmls,.xls,.xlsx,audio/*,video/*" type="file" />
            <Image alt="upload" width={58} height={39} src="/svgs/upload.svg" />
            <UploadTypography>
              Solte os arquivos para fazer upload
            </UploadTypography>
            <P>Tamanho máximo de 4mb por arquivo</P>
            {/* // TODO: Adicionar feature de google drive */}
            {/* <DriveButton>
              <GoogleDrive>Google Drive</GoogleDrive>
            </DriveButton> */}
          </Label>
        </UploadField>
        <CustomTypography>Anexados (1)</CustomTypography>
        <FilesWrapper>
          {files.map((file) => (
            <Box sx={{
              position: 'relative',
              marginTop: '0.3rem',
            }} width={54}>
            {file.imageUrl ? <Image
              alt={file.name}
              width={54}
              height={46}
              src={file.imageUrl}
            />: <Box 
              width={54}
              height={46}
              sx={(theme)=>({
                backgroundColor: theme.palette.caption.main,
              })}
            />}
            <AttachName>placeholder-image.png</AttachName>
            <RemoveBox onClick={()=>handleRemoveFile(file.id)}>
              <Close sx={{
                height: '1rem',
                paddingRight: '0.3rem',
                paddingBottom: '0rem',
              }} />
            </RemoveBox>
          </Box>
          ))}
        </FilesWrapper>
      </>
    </ModalComponent>
  );
};

export default FilesUploadModal;
