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
    });
    setIsSavingImage(false);
    setOpen(false);
  };

  const handleCapture = (_files: any) => {
    setIsSavingImage(true);
    HandleFileUpload([_files['0']], (file) => {
      setThumbnail(file);
      setIsSavingImage(false);
    });
  };
  const handleCaptureConclusion = (_files: any) => {
    setIsSavingImage(true);
    HandleFileUpload([_files['0']], (file) => {
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
      title="Agrupador de Etapas"
      deleteMessage={deleteGroup}
      isBlocked={isSavingImage}
    >
      <>
        {deleteGroup ? (
          <>
            <Box sx={{ textAlign: 'center' }}>
              <DeleteText>
                Esse agrupador possui uma ou mais etapas. Você tem certeza que
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
                title="Icone/Imagem do agrupador"
                thumbnail={
                  thumbnail ? thumbnail.data || thumbnail.sourceUrl : null
                }
                isBlocked={isSavingImage}
                onUploadImage={(target) => handleCapture(target.files)}
              />
              <AddImage
                title="Imagem de conclusão"
                thumbnail={
                  thumbnailConclusion
                    ? thumbnailConclusion.data || thumbnailConclusion.sourceUrl
                    : null
                }
                isBlocked={isSavingImage}
                onUploadImage={(target) => {
                  handleCaptureConclusion(target.files);
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
