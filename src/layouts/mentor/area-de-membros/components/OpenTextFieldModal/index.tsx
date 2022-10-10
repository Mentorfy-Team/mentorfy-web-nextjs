import { useState } from 'react';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';

const OpenTextFieldModal = ({
  open,
  setOpen,
  onChange,
  data: { title: titleData, description: descriptionData },
}) => {
  const [title, setTitle] = useState(titleData);
  const [description, setDescription] = useState(descriptionData);

  const handleSave = (del?: boolean) => {
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
      title="Campo de Texto Aberto"
    >
      <>
        <InputField
          label="Título"
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DescriptionInputField
          label="Campo de Texto Aberto"
          placeholder="Digite seu texto aqui."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </>
    </ModalComponent>
  );
};

export default OpenTextFieldModal;
