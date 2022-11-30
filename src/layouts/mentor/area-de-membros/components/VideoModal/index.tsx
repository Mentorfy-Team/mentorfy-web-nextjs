import { useState } from 'react';
import { Box } from '@mui/material';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import HandleFileUpload from '~/helpers/HandleFileUpload';
import AddImage from '../AddImage';
import ContentBox from '../ContentBox';
import UploadToUrlFiles from '../UploadFileModal/helpers/UploadToUrlFiles';
import Video from './components/Video';
import { AcceptedLinksText, AddTaskButton, LinkInputWrapper } from './styles';

export type TaskObject = {
  id?: string;
  title?: string;
  description?: string;
  link?: string;
};

const VideoModal = ({
  open,
  setOpen,
  data: {
    data: videosData,
    title: titleData,
    description: descriptionData,
    extra: thumbnailData,
  },
  onChange,
  multivideos = false,
  area_id,
  withLink = true,
}) => {
  const [title, setTitle] = useState(titleData);
  const [description, setDescription] = useState(descriptionData);
  const [thumbnail, setThumbnail] = useState<any>(thumbnailData);
  const [videos, setVideos] = useState<TaskObject[]>(
    videosData || [
      {
        id: '0',
        title: 'Meu vídeo 1',
      },
    ],
  );
  const [singleVideo, setSingleVideo] = useState<{ link: string }>(
    multivideos ? '' : videosData,
  );

  const addNewTask = () => {
    const newVideos = {
      id: Math.random() + '',
      title: 'Meu vídeo ' + (videos.length + 1),
    };
    setVideos([...videos, newVideos]);
  };

  const onVideoChange = (
    id: string,
    _title: string,
    _description: string,
    _link: string,
  ) => {
    setVideos((oldTasks) => {
      oldTasks.find((_task) => _task.id === id).title = _title;
      oldTasks.find((_task) => _task.id === id).description = _description;
      oldTasks.find((_task) => _task.id === id).link = _link;
      return [...oldTasks];
    });
  };

  const handleSave = async (del?: boolean) => {
    let convertedFiles;
    if (thumbnail)
      convertedFiles = await UploadToUrlFiles([thumbnail], area_id);
    const filterEmpty = multivideos
      ? videos.filter((task) => task.title)
      : null;

    onChange({
      title,
      description,
      extra: convertedFiles ? convertedFiles[0] : null,
      data: multivideos ? filterEmpty : singleVideo,
      delete: del,
    });
    setOpen(false);
  };

  const onDeleteTask = (video_id: string) => {
    setVideos((oldVideos) => {
      const vds = oldVideos.filter((_video) => {
        return _video.id !== video_id;
      });
      return [...vds];
    });
  };

  const handleCapture = (_files: any) => {
    HandleFileUpload([_files['0']], (file) => {
      setThumbnail(file);
    });
  };

  return (
    <ModalComponent
      onSave={() => handleSave()}
      onDelete={() => handleSave(true)}
      open={open}
      setOpen={setOpen}
      title="Upload de Vídeo"
    >
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
        <AddImage
          thumbnail={thumbnail ? thumbnail.data || thumbnail.sourceUrl : null}
          onUploadImage={(target) => handleCapture(target.files)}
        />
        {!multivideos && withLink && (
          <LinkInputWrapper>
          <InputField
            required
            label="Link"
            placeholder="https://youtube.com.br/xyz"
            value={singleVideo?.link}
            onChange={(e) => setSingleVideo({ link: e.target.value })}
          ></InputField>
          <AcceptedLinksText>*No momento apenas links Vímeo, Panda e Youtube</AcceptedLinksText>
          </LinkInputWrapper>
        )}
        {multivideos && (
          <ContentBox>
            {videos.map((task) => (
              <Video
                key={task.id}
                data={task}
                onSaveTask={(id, _title, _description, _link) =>
                  onVideoChange(id, _title, _description, _link)
                }
                onDeleteTask={(id) => onDeleteTask(id)}
              />
            ))}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: '1.6rem',
              }}
            >
              <AddTaskButton onClick={() => addNewTask()}>
                + Adicionar Vídeo
              </AddTaskButton>
            </Box>
          </ContentBox>
        )}
      </>
    </ModalComponent>
  );
};

export default VideoModal;
