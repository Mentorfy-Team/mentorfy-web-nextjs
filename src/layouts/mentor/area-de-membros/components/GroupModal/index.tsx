import { useState } from 'react';
import Box from '@mui/material/Box';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import HandleFileUpload from '~/helpers/HandleFileUpload';
import AddImage from '../AddImage';
import UploadToUrlFiles from '../UploadFileModal/helpers/UploadToUrlFiles';
import { DeleteText } from './styles';

export type TaskObject = any[];

const GroupModal = ({
  open,
  setOpen,
  data: {
    data: taskData,
    title: titleData,
    description: descriptionData,
    extra,
    rows: rowsData,
  },
  onChange,
  area_id,
}) => {
  const [title, setTitle] = useState(titleData);
  const [description, setDescription] = useState(descriptionData);
  const [deleteGroup, setDeleteGroup] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);

  const [thumbnail, setThumbnail] = useState<any>(
    extra?.length > 0 ? extra[0] : '',
  );
  const [thumbnailConclusion, setThumbnailConclusion] = useState<any>(
    extra?.length > 1 ? extra[1] : '',
  );
  const [removedFiles, setRemovedFiles] = useState<string[]>([]);

  const handleSave = async (del?: boolean) => {
    setIsSavingImage(true);
    const images = [];
    if (thumbnail) {
      images.push(thumbnail);
    }
    if (thumbnailConclusion) {
      images.push(thumbnailConclusion);
    }
    const convertedFiles = await UploadToUrlFiles(images, area_id);

    onChange({
      title,
      description,
      extra: convertedFiles,
      delete: del,
      toRemove: removedFiles,
    });
    setIsSavingImage(false);
    setOpen(false);
  };

  const handleCapture = (_files: any) => {
    setIsSavingImage(true);
    HandleFileUpload([_files['0']], (file) => {
      if (extra?.length > 0 && extra[0]) {
        setRemovedFiles([...removedFiles, extra[0]]);
      }
      setThumbnail(file);
      setIsSavingImage(false);
    });
  };
  const handleCaptureConclusion = (_files: any) => {
    setIsSavingImage(true);
    HandleFileUpload([_files['0']], (file) => {
      if (extra?.length > 1 && extra[1]) {
        setRemovedFiles([...removedFiles, extra[1]]);
      }
      setThumbnailConclusion(file);
      setIsSavingImage(false);
    });
  };

  return (
    <ModalComponent
      onSave={() => handleSave()}
      onDelete={() => {
        // show a browser alert to confirm the delete
        if (rowsData.length > 0) {
          setDeleteGroup(true);
        }
        if (rowsData.length === 0) {
          handleSave(true);
        }
        if (deleteGroup === true) {
          handleSave(true);
        }
      }}
      open={open}
      setOpen={setOpen}
      title="Informações do Módulo"
      deleteMessage={deleteGroup}
      isBlocked={isSavingImage}
    >
      <>
        {deleteGroup ? (
          <>
            <Box sx={{ textAlign: 'center' }}>
              <DeleteText>
                Esse módulo possui uma ou mais etapas. Você tem certeza que
                deseja excluir?
              </DeleteText>
            </Box>
          </>
        ) : (
          <>
            <InputField
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder=""
            ></InputField>
            <InputField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Descrição"
              placeholder=""
            ></InputField>
            <Box sx={{ width: '100%' }}>
              <AddImage
                title="Icone do módulo"
                thumbnail={
                  thumbnail ? thumbnail.data || thumbnail.sourceUrl : null
                }
                isBlocked={isSavingImage}
                onUploadImage={(target) => handleCapture(target.files)}
                onRemove={(sourceUrl) => {
                  setRemovedFiles([...removedFiles, sourceUrl]);
                  setThumbnail(null);
                }}
              />
              <AddImage
                title="Imagem de conclusão"
                defaultImage="/svgs/finished.svg"
                thumbnail={
                  thumbnailConclusion
                    ? thumbnailConclusion.data || thumbnailConclusion.sourceUrl
                    : null
                }
                isBlocked={isSavingImage}
                onUploadImage={(target) => {
                  handleCaptureConclusion(target.files);
                }}
                onRemove={(sourceUrl) => {
                  setRemovedFiles([...removedFiles, sourceUrl]);
                  setThumbnailConclusion(null);
                }}
              />
            </Box>
          </>
        )}
      </>
    </ModalComponent>
  );
};

export default GroupModal;
