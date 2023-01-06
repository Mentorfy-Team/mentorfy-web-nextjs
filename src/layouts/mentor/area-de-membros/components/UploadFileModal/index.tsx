/* eslint-disable no-useless-escape */
import { useState } from 'react';
import Box from '@mui/material/Box';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';

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

const UploadFileModal = ({
  open,
  setOpen,
  onChange,
  data: { title: titleData, description: descriptionData },
}) => {
  const [title, setTitle] = useState(titleData);
  const [description, setDescription] = useState(descriptionData);

  const handleSave = async (del?: boolean) => {
    onChange({
      title,
      description,
      delete: del,
    });
    setOpen(false);
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

      </>
    </ModalComponent>
  );
};

export default UploadFileModal;
