import { useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { PasteCodeField, PlaceHolderBox, UploadTypography } from './styles';

const EmbedModal = ({
  open,
  setOpen,
  onChange,
  data: { title: titleData, description: descriptionData, data: EmbedData },
}) => {
  const [display, setDisplay] = useState(true);
  const [title, setTitle] = useState<string>(titleData);
  const [description, setDescription] = useState<string>(descriptionData);
  const [embed, setEmbed] = useState<string>(EmbedData);

  const handleSave = (del?: boolean) => {
    onChange({
      title,
      description,
      data: embed,
      delete: del,
    });
    setOpen(false);
  };

  return (
    <ModalComponent
      onSave={() => handleSave()}
      onDelete={() => handleSave(true)}
      open={open}
      setOpen={setOpen}
      title="Embed"
    >
      <>
        <InputField
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          label="Título"
          placeholder=""
        ></InputField>
        <DescriptionInputField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Campo de Texto Aberto"
          placeholder=""
        />
        <Box sx={{ position: 'relative' }}>
          {display && (!embed || embed?.length === 0) && (
            <PlaceHolderBox>
              <Image
                alt=""
                width={30}
                height={30}
                src="/svgs/embed.svg"
              ></Image>
              <UploadTypography>Cole seu código aqui</UploadTypography>
            </PlaceHolderBox>
          )}
          <PasteCodeField
            id="placeholder"
            value={embed}
            onFocus={() => setDisplay(false)}
            onBlur={() =>
              !embed || embed?.length === 0 ? setDisplay(true) : null
            }
            onChange={(e) => setEmbed(e.target.value)}
            className="text-field"
            label="Embed Code"
            multiline
            maxRows={20}
            color="secondary"
            InputLabelProps={{
              shrink: true,
            }}
          ></PasteCodeField>
        </Box>
      </>
    </ModalComponent>
  );
};

export default EmbedModal;
