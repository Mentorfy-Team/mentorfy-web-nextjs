import { useState } from 'react';
import Box from '@mui/material/Box';
import InputField from '@app/components/atoms/InputField';
import ModalComponent from '@app/components/modules/Modal';
import HandleFileUpload from '@app/helpers/HandleFileUpload';
import AddImage from '../AddImage';
import UploadToUrlFiles from '../UploadFileModal/helpers/UploadToUrlFiles';
import { Checkbox, DeleteText } from './styles';
import {
  BpCheckedIcon,
  BpIcon,
} from '@app/layouts/mentorado/components/checklist-modal/styles';

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
  area_type,
}) => {
  const [title, setTitle] = useState(titleData);
  const [description, setDescription] = useState(descriptionData);
  const [deleteGroup, setDeleteGroup] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [lockFeature, setLockFeature] = useState(extra?.lockFeature || false);

  const [thumbnail, setThumbnail] = useState<any>(
    taskData?.length > 0 ? taskData[0] : '',
  );
  const [thumbnailConclusion, setThumbnailConclusion] = useState<any>(
    taskData?.length > 1 ? taskData[1] : '',
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
      data: convertedFiles,
      extra: { lockFeature },
      delete: del,
      toRemove: removedFiles,
    });
    setIsSavingImage(false);
    setOpen(false);
  };

  const handleCapture = (_files: any) => {
    setIsSavingImage(true);
    HandleFileUpload([_files['0']], (file) => {
      if (taskData?.length > 0 && taskData[0]) {
        setRemovedFiles([...removedFiles, taskData[0]]);
      }
      setThumbnail(file);
      setIsSavingImage(false);
    });
  };
  const handleCaptureConclusion = (_files: any) => {
    setIsSavingImage(true);
    HandleFileUpload([_files['0']], (file) => {
      if (taskData?.length > 1 && taskData[1]) {
        setRemovedFiles([...removedFiles, taskData[1]]);
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
      <div
        style={{
          width: '500px',
        }}
      >
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
            {[1, 2, 3, 4].some((n) => n == area_type) && (
              <Box
                onClick={() => setLockFeature((old) => !old)}
                display="flex"
                alignItems="center"
                pb={4}
                pt={2}
                gap={2}
                sx={{ cursor: 'pointer' }}
              >
                <Checkbox
                  sx={{
                    padding: '0',
                    color: 'white',
                  }}
                  disableRipple
                  icon={<BpIcon />}
                  checkedIcon={<BpCheckedIcon />}
                  color="default"
                  checked={lockFeature}
                  name="lockFeature"
                />
                <span>Liberar o próximo módulo ao concluír o atual.</span>
              </Box>
            )}
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
      </div>
    </ModalComponent>
  );
};

export default GroupModal;
