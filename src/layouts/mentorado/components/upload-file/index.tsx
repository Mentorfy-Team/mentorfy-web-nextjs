import { useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';

import Description from '~/components/atoms/ModalDescription';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import DropzoneComponent from '~/components/modules/Dropzone';
import {
  AttachName,
  CustomTypography,
  FilesWrapper,
  Label,
  P,
  RemoveBox,
  UploadField,
  UploadTypography,
} from './styles';
import { FileType } from '~/layouts/mentor/area-de-membros/components/DownloadFileModal';
import HandleFileUpload from '~/helpers/HandleFileUpload';
import { Close } from '@mui/icons-material';
import UploadToUrlFiles from '~/layouts/mentor/area-de-membros/components/DownloadFileModal/helpers/UploadToUrlFiles';
import { useProfile } from '~/hooks/useProfile';

type InputProps = { id: string; value: boolean }[];
type ExtraProps = boolean;

type ToolProps = {
  name: string;
  size: number;
  sourceUrl: string;
  type: string;
}[];

const FilesUploadModal = ({
  open,
  setOpen,
  data: { data: filesData, title: titleData, description: descriptionData },
  onChange,
  userInput,
}: MentoredComponents.Props<ToolProps, InputProps, ExtraProps>) => {
  const {
    data: { profile },
  } = useProfile();

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

  const handleUpload = (_files: any) => {
    HandleFileUpload(_files, (file) => {
      setFiles((oldFiles) => [...oldFiles, file]);
    });
  };

  const getImage = (file) => {
    return '/images/file.png';
  };

  const handleFinish = async () => {
    const convertedFiles = await UploadToUrlFiles(files, profile.id);
    onChange({
      data: convertedFiles,
      extra: {
        finished: true,
      },
    });
    setOpen(false);
  };

  const HeadText = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Image
        alt="perguntas"
        src="/svgs/files-download-icon.svg"
        height={20}
        width={22}
      />
      <>{titleData}</>
    </Box>
  );
  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      title={HeadText}
      isMentorado
      onSave={() => handleFinish()}
    >
      <ModalDialogContent sx={{ textAlign: 'center', maxWidth: '600px' }}>
        <Description>{descriptionData}</Description>
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <CustomTypography>Arquivo Anexado</CustomTypography>
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
          </Box>
        )}
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default FilesUploadModal;
