/* eslint-disable no-useless-escape */
import { useState } from 'react';
import { Close } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import DescriptionInputField from '@app/components/atoms/DescriptionInputField';
import InputField from '@app/components/atoms/InputField';
import DropzoneComponent from '@app/components/modules/Dropzone';
import ModalComponent from '@app/components/modules/Modal';
import HandleFileUpload from '@app/helpers/HandleFileUpload';
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
  const [removedFiles, setRemovedFiles] = useState<string[]>([]);

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

  const getImage = (file) => {
    // const isDataImage = file.data?.search('(http(s?):)*.(?:jpg|gif|png)');
    // const isSourceImage = file.sourceUrl?.search(
    //   '(http(s?):)*.(?:jpg|gif|png)',
    // );

    // if (
    //   isDataImage !== -1 &&
    //   isSourceImage !== -1 &&
    //   isDataImage !== 'undefined' &&
    //   isSourceImage !== 'undefined'
    // ) {
    //   return file.data || file.sourceUrl;
    // }
    return '/images/file.png';
  };

  return (
    <ModalComponent
      onDelete={() => handleSave(true)}
      onSave={() => handleSave()}
      open={open}
      setOpen={setOpen}
      title="Upload de Arquivo"
    >
      <>
        <Box width="100vw" />
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

        {files?.length === 0 && (
          <Box sx={{ width: '100%' }}>
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
                  {/* // TODO: Adicionar feature de google drive */}
                  {/* <DriveButton>
              <GoogleDrive>Google Drive</GoogleDrive>
            </DriveButton> */}
                </Label>
              </UploadField>
            </DropzoneComponent>
          </Box>
        )}
        {files?.length !== 0 && (
          <CustomTypography>Arquivo Anexado</CustomTypography>
        )}
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
              <Image
                alt={file.name}
                width={54}
                height={46}
                src={getImage(file)}
                style={{
                  objectFit: 'contain',
                }}
              />
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
