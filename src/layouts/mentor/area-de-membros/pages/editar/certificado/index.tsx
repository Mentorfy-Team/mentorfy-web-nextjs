import Box from '@mui/material/Box';
import Save from '@mui/icons-material/Save';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import InputField from '~/components/atoms/InputField';
import HandleFileUpload from '~/helpers/HandleFileUpload';
import { useForm } from 'react-hook-form';

import {
  BpCheckedIcon,
  BpIcon,
  ButtonsWrapper,
  CheckText,
  CheckWrapper,
  DocumentText,
  FieldButton,
  FileWrapper,
  Label,
  NameText,
  P,
  SaveButton,
  SvgWrapper,
  UploadField,
  UploadTypography,
  UsageText,
  Wrapper,
} from './styles';
import { useTheme } from '@mui/material/styles';
import DropzoneComponent from '~/components/modules/Dropzone';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FileType } from '../../../components/UploadFileModal';
import { UpdateCertificate } from '~/services/certificate-upload.service';
import { DefaultCertificate } from '~/consts/certificate';
import { toast } from 'react-toastify';
import { DragBox } from './components/DragBox';

const PDFReader = dynamic(
  () => import('~/components/atoms/PDFReader/PDFReader'),
  {
    ssr: false,
  },
);

const Certificate = ({ id }) => {
  const { handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [color, setColor] = useState(false);
  const theme = useTheme();
  const [files, setFiles] = useState<FileType[]>([]);
  const [show, setShow] = useState({
    name: false,
    document: false,
    finishedAt: false,
    courseName: false,
    mentorName: false,
  });
  const [isStoped, setIsStoped] = useState({
    stopedName: false,
    stopedDocument: false,
    stopedFinishedAt: false,
    stopedCourseName: false,
    stopedMentorName: false,
  });
  const [certificate, setCertificate] = useState({
    product_id: id,
    title: '',
    default_certificate: '',
    url: '',
    student: {
      name: {
        pageX: '',
        pageY: '',
      },
      finished_at: {
        pageX: '',
        pageY: '',
      },
      document: {
        pageX: '',
        pageY: '',
      },
    },
    course: {
      name: {
        pageX: '',
        pageY: '',
      },
      owner: {
        pageX: '',
        pageY: '',
      },
    },
  });

  const [defaultCertificate, setDefaultCertificate] =
    useState(DefaultCertificate);

  function BpCheckbox(props: CheckboxProps) {
    return (
      <Checkbox
        sx={{
          padding: '0',
          color: `${theme.palette.text.primary}`,
        }}
        disableRipple
        icon={<BpIcon />}
        checkedIcon={<BpCheckedIcon />}
        checked={color}
        color="default"
        onChange={(e) => (e.target.checked ? setColor(true) : setColor(false))}
        {...props}
      />
    );
  }
  console.log(defaultCertificate);
  const handleUpload = (_files: any) => {
    HandleFileUpload(_files, (file) => {
      setFiles(file);
    });
  };

  const handleShowStates = (e) => {
    // * dinamicamente seta o nome do atributo dentro do state com status true
    setShow((oldStates) => {
      const newState = { ...oldStates, [e.target.getAttribute('name')]: true };
      return newState;
    });

    if (e.target.innerHTML === 'Usar certificado padrão Mentorfy') {
      setShow({
        name: false,
        document: false,
        finishedAt: false,
        courseName: false,
        mentorName: false,
      });
      setColor(!color);
      setFiles([]);
      setTitle('');
    }
  };

  const formatAndSave = (e, state, fieldName) => {
    return {
      ...state,
      student: {
        ...state?.student,
        [fieldName]: {
          pageX: e.layerX,
          pageY: e.layerY,
        },
      },
    };
  };

  const handleStopDraging = (e) => {
    if (e.target.innerHTML === 'NOME DO CLIENTE') {
      setIsStoped((oldStates) => {
        const newState = { ...oldStates, stopedName: true };
        return newState;
      });
      setCertificate((old) => {
        return {
          ...old,
          title: title,
          default_certificate: null,
          url: (files as any).data,
          student: {
            ...old?.student,
            name: {
              pageX: e.layerX,
              pageY: e.layerY,
            },
          },
        };
      });
    }

    if (e.target.innerHTML === 'DOCUMENTO DO ALUNO') {
      setIsStoped((oldStates) => {
        const newState = { ...oldStates, stopedDocument: true };
        return newState;
      });
      setCertificate((old) => {
        return {
          ...old,
          student: {
            ...old?.student,
            document: {
              pageX: e.layerX,
              pageY: e.layerY,
            },
          },
        };
      });
    }
    if (e.target.innerHTML === 'DATA DE TÉRMINO') {
      setIsStoped((oldStates) => {
        const newState = { ...oldStates, stopedFinishedAt: true };
        return newState;
      });
      setCertificate((old) => {
        return formatAndSave(e, old, 'finished_at');
      });
    }
    if (e.target.innerHTML === 'NOME DO CURSO') {
      setIsStoped((oldStates) => {
        const newState = { ...oldStates, stopedCourseName: true };
        return newState;
      });
      setCertificate((old) => {
        return formatAndSave(e, old, 'name');
      });
    }
    if (e.target.innerHTML === 'SEU NOME') {
      setIsStoped((oldStates) => {
        const newState = { ...oldStates, stopedMentorName: true };
        return newState;
      });
      setCertificate((old) => {
        return formatAndSave(e, old, 'owner');
      });
    }
  };

  useEffect(() => {
    if (color) {
      setDefaultCertificate((old) => {
        return {
          ...old,
          product_id: id,
          title: title,
        };
      });
    }
  }, [color, id, title]);

  const onSubmit = async () => {
    setIsLoading(true);
    if (color) {
      await UpdateCertificate(defaultCertificate);
    }
    if (!color) {
      await UpdateCertificate(certificate);
    }
    toast.success('Certificado salvo com sucesso');
    setIsLoading(false);
  };

  const nameElement = <NameText>NOME DO CLIENTE</NameText>;
  const documentElement = <DocumentText>DOCUMENTO DO ALUNO</DocumentText>;
  const finishedAtElement = <DocumentText>DATA DE TÉRMINO</DocumentText>;
  const courseNameElement = <DocumentText>NOME DO CURSO</DocumentText>;
  const mentorNameElement = <DocumentText>SEU NOME</DocumentText>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        pb={2}
      >
        <div />
        <SaveButton
          variant="outlined"
          color="primary"
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          <SvgWrapper>
            <Save />
          </SvgWrapper>
          Salvar alterações
        </SaveButton>
      </Box>
      <InputField
        color="secondary"
        value={title}
        label="Título"
        required={true}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setTitle(e.target.value)}
      />
      <CheckWrapper onClick={(e) => handleShowStates(e)}>
        <BpCheckbox />
        <CheckText sx={{ color: `${color && '#7DDC51'}` }}>
          Usar certificado padrão Mentorfy
        </CheckText>
      </CheckWrapper>

      {!color && (
        <>
          {files && files?.length !== 0 && (
            <Wrapper>
              <div>
                <UsageText>
                  Selecione os campos que você gostaria de adicionar em seu
                  certificado
                  <strong> clicando no botão</strong> com o respectivo nome do
                  campo, em seguida
                  <strong> arraste o campo criado para o local exato </strong>em
                  que deve ficar no certificado. Repita o processo para cada
                  campo desejado.
                </UsageText>
                <ButtonsWrapper>
                  <FieldButton
                    variant="outlined"
                    name="name"
                    onClick={(e) => handleShowStates(e)}
                  >
                    Nome do Aluno
                  </FieldButton>
                  <FieldButton
                    name="document"
                    variant="outlined"
                    onClick={(e) => handleShowStates(e)}
                  >
                    Documento do Aluno
                  </FieldButton>
                  <FieldButton
                    variant="outlined"
                    name="finishedAt"
                    onClick={(e) => handleShowStates(e)}
                  >
                    Data de Término
                  </FieldButton>
                  <FieldButton
                    name="courseName"
                    variant="outlined"
                    onClick={(e) => handleShowStates(e)}
                  >
                    Nome do Curso
                  </FieldButton>
                  <FieldButton
                    name="mentorName"
                    variant="outlined"
                    onClick={(e) => handleShowStates(e)}
                  >
                    Seu Nome
                  </FieldButton>
                </ButtonsWrapper>
              </div>
              <FileWrapper id="dragRef">
                <PDFReader file={(files as any)?.data} />

                {show.name && (
                  <DragBox
                    element={nameElement}
                    showBorder={isStoped.stopedName}
                    onStopDrag={handleStopDraging}
                  />
                )}
                {show.document && (
                  <DragBox
                    element={documentElement}
                    showBorder={isStoped.stopedDocument}
                    onStopDrag={handleStopDraging}
                  />
                )}
                {show.finishedAt && (
                  <DragBox
                    element={finishedAtElement}
                    showBorder={isStoped.stopedFinishedAt}
                    onStopDrag={handleStopDraging}
                  />
                )}
                {show.courseName && (
                  <DragBox
                    element={courseNameElement}
                    showBorder={isStoped.stopedCourseName}
                    onStopDrag={handleStopDraging}
                  />
                )}
                {show.mentorName && (
                  <DragBox
                    element={mentorNameElement}
                    showBorder={isStoped.stopedMentorName}
                    onStopDrag={handleStopDraging}
                  />
                )}
              </FileWrapper>
            </Wrapper>
          )}
          {files?.length === 0 && (
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
                </Label>
              </UploadField>
            </DropzoneComponent>
          )}
        </>
      )}
      {color && (
        <Wrapper>
          <FileWrapper id="dragRef">
            <PDFReader file={defaultCertificate.url} />
          </FileWrapper>
        </Wrapper>
      )}
    </form>
  );
};

export default Certificate;
