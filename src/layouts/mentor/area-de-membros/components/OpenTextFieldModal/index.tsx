import { useRef, useState } from 'react';
import DescriptionInputField from '~/components/atoms/DescriptionInputField';
import InputField from '~/components/atoms/InputField';
import ModalComponent from '~/components/modules/Modal';
import { Editor } from '@tinymce/tinymce-react';

const OpenTextFieldModal = ({
  open,
  setOpen,
  onChange,
  data: { title: titleData, description: descriptionData, data },
  readOnly,
}) => {
  const [title, setTitle] = useState(titleData);
  const [description, setDescription] = useState(descriptionData);
  const [dataText, setDataText] = useState<string>();
  const editorRef = useRef(null);
  const handleSave = (del?: boolean) => {
    onChange({
      title,
      description,
      data: dataText,
      delete: del,
    });
    setOpen(false);
  };

  return (
    <ModalComponent
      onSave={readOnly ? null : () => handleSave()}
      onDelete={readOnly ? null : () => handleSave(true)}
      onClose={readOnly ? () => setOpen(false) : null}
      open={open}
      setOpen={setOpen}
      title="Campo de Texto Aberto"
    >
      <div
        style={{
          width: '100%',
        }}
      >
        <InputField
          label="Título"
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DescriptionInputField
          label="Descrição (opcional)"
          placeholder="Digite seu texto aqui."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Editor
          apiKey="d4ptxuqt6len6byy7o7nui15p4zniwh7m4gau46lppgpyr7w"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={data}
          onEditorChange={(a, editor) => setDataText(a)}
          init={{
            height: '50vh',
            width: '100%',
            menubar: false,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
            ],
            toolbar:
              'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      </div>
    </ModalComponent>
  );
};

export default OpenTextFieldModal;
