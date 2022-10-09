import { useState } from 'react';
import { Close } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import DropzoneComponent from '~/components/modules/Dropzone';
import ModalComponent from '~/components/modules/Modal';
import HandleFileUpload from '~/helpers/HandleFileUpload';
import UploadToUrlFiles from './helpers/UploadToUrlFiles';
import {
  AttachName,
  CustomTypography,
  //DriveButton,
  FilesWrapper,
  //GoogleDrive,
  Label,
  P,
  RemoveBox,
  UploadField,
  //UploadInput,
  UploadTypography,
} from './styles';

export type FileType = {
  name: string;
  id?: string;
  sourceUrl?: string;
  imageUrl?: string;
  size: number;
  data: string;
  file: any;
  type: string;
};

const FilesUploadModal = ({
  area_id,
  open,
  setOpen,
  onChange,
  data: { title: titleData, description: descriptionData, data: filesData },
}) => {
  const [title, setTitle] = useState(titleData);
  const [description, setDescription] = useState(descriptionData);

  const [files, setFiles] = useState<FileType[]>(filesData || []);
  const [removedFiles, setRemovedFiles] = useState<FileType[]>([]);

  const handleRemoveFile = (_file) => {
    setRemovedFiles([...removedFiles, _file.sourceUrl]);
    setFiles(
      files.filter(
        (file) =>
          file.sourceUrl !== _file.sourceUrl ||
          file.size !== _file.size ||
          file.name !== _file.name,
      ),
    );
  };

  const handleSave = async (del?: boolean) => {
    const convertedFiles = await UploadToUrlFiles(files, area_id);

    onChange({
      title,
      description,
      data: convertedFiles,
      delete: del,
      toRemove: removedFiles,
    });
    setOpen(false);
  };

  const handleUpload = (_files: any) => {
    HandleFileUpload(_files, (file) => {
      setFiles((oldFiles) => [...oldFiles, file]);
    });
  };

  return (
    <ModalComponent
      onDelete={() => handleSave(true)}
      onSave={() => handleSave()}
      open={open}
      setOpen={setOpen}
      title="Upload de Arquivos"
    >
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
        <DropzoneComponent onDrop={(_files) => handleUpload(_files)}>
          <UploadField sx={{ marginBottom: '1.3rem' }}>
            <Label>
              <Image
                alt="upload"
                width={58}
                height={39}
                src="/svgs/upload.svg"
              />
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
        </DropzoneComponent>
        <CustomTypography>Anexados ({files?.length || 0})</CustomTypography>
        <FilesWrapper>
          {files?.map((file) => (
            <Box
              key={file.id}
              sx={{
                position: 'relative',
                marginTop: '0.3rem',
              }}
              width={54}
            >
              {file.data?.search('(http(s?):)([/|.|w|s|-])*.(?:jpg|gif|png)') ||
              file.sourceUrl?.search(
                '(http(s?):)([/|.|w|s|-])*.(?:jpg|gif|png)',
              ) ? (
                <Image
                  alt={file.name}
                  width={54}
                  height={46}
                  src={file.sourceUrl || file.data}
                  objectFit="cover"
                />
              ) : (
                <Box
                  width={54}
                  height={46}
                  sx={(theme) => ({
                    backgroundColor: theme.palette.caption.main,
                  })}
                />
              )}
              <AttachName>{file.name}</AttachName>
              <RemoveBox onClick={() => handleRemoveFile(file)}>
                <Close
                  sx={{
                    height: '1rem',
                    paddingRight: '0.3rem',
                    paddingBottom: '0rem',
                  }}
                />
              </RemoveBox>
            </Box>
          ))}
        </FilesWrapper>
      </>
    </ModalComponent>
  );
};

export default FilesUploadModal;
