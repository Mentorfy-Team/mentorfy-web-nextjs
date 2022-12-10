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
  DraggableItem,
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
import Draggable from 'react-draggable';
import { FileType } from '../../../components/UploadFileModal';
import { UpdateCertificate } from '~/services/certificate-upload.service';
import { DefaultCertificate } from '~/consts/certificate';
import { toast } from 'react-toastify';

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
    'showName': false,
    'showDocument': false,
    'showFinishedAt': false,
    'showCourseName': false,
    'showMentorName': false,
  });
  const [isStoped, setIsStoped] = useState({
    'stopedName': false,
    'stopedDocument': false,
    'stopedFinishedAt': false,
    'stopedCourseName': false,
    'stopedMentorName': false,
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
      }
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

  const [defaultCertificate, setDefaultCertificate] = useState(DefaultCertificate);

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
    if (e.target.getAttribute('name') === 'name') {
      setShow((oldStates) => {
        const newState = { ...oldStates, showName: true };
        return newState;
      });
    }
    if (e.target.getAttribute('name') === 'document') {
      setShow((oldStates) => {
        const newState = { ...oldStates, showDocument: true };
        return newState;
      });
    }
    if (e.target.getAttribute('name') === 'finishedAt') {
      setShow((oldStates) => {
        const newState = { ...oldStates, showFinishedAt: true };
        return newState;
      });
    }
    if (e.target.getAttribute('name') === 'courseName') {
      setShow((oldStates) => {
        const newState = { ...oldStates, showCourseName: true };
        return newState;
      });
    }
    if (e.target.getAttribute('name') === 'mentorName') {
      setShow((oldStates) => {
        const newState = { ...oldStates, showMentorName: true };
        return newState;
      });
    }
    if (e.target.innerHTML === 'Usar certificado padrão Mentorfy') {
      setShow({ showName: false, showDocument: false, showFinishedAt: false, showCourseName: false, showMentorName: false });
      setColor(!color);
      setFiles([]);
      setTitle('');
    }
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
          default_certificate: false,
          url: files.data,
          student: {
            ...old?.student,
            name: {
              pageX: e.layerX,
              pageY: e.layerY
            }
          }
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
              pageY: e.layerY
            }
          }
        };

      });
    }
    if (e.target.innerHTML === 'DATA DE TÉRMINO') {
      setIsStoped((oldStates) => {
        const newState = { ...oldStates, stopedFinishedAt: true };
        return newState;
      });
      setCertificate((old) => {
        return {
          ...old,
          student: {
            ...old?.student,
            finished_at: {
              pageX: e.layerX,
              pageY: e.layerY
            }
          }
        };

      });
    }
    if (e.target.innerHTML === 'NOME DO CURSO') {
      setIsStoped((oldStates) => {
        const newState = { ...oldStates, stopedCourseName: true };
        return newState;
      });
      setCertificate((old) => {
        return {
          ...old,
          course: {
            ...old?.course,
            name: {
              pageX: e.layerX,
              pageY: e.layerY
            }
          }
        };

      });
    }
    if (e.target.innerHTML === 'SEU NOME') {
      setIsStoped((oldStates) => {
        const newState = { ...oldStates, stopedMentorName: true };
        return newState;
      });
      setCertificate((old) => {
        return {
          ...old,
          course: {
            ...old?.course,
            owner: {
              pageX: e.layerX,
              pageY: e.layerY
            }
          }
        };

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

    <form onSubmit={handleSubmit(onSubmit)} >
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
      <CheckWrapper
        onClick={(e) => handleShowStates(e)}
      >
        <BpCheckbox />
        <CheckText sx={{ color: `${color && '#7DDC51'}` }}>
          Usar certificado padrão Mentorfy
        </CheckText>
      </CheckWrapper>

      {
        !color && (
          <>
            {files && files?.length !== 0 && (
              <Wrapper>
                <div>
                  <UsageText>
                    Selecione os campos que você gostaria de adicionar em seu certificado
                    <strong> clicando no botão</strong> com o respectivo nome do campo, em seguida<strong> arraste o
                      campo criado para o local exato </strong>em que deve ficar no certificado. Repita o processo para cada campo desejado.
                  </UsageText>
                  <ButtonsWrapper>
                    <FieldButton
                      variant="outlined"
                      name='name'
                      onClick={(e) => handleShowStates(e)}
                    >
                      Nome do Aluno
                    </FieldButton>
                    <FieldButton
                      name='document'
                      variant="outlined"
                      onClick={(e) => handleShowStates(e)}
                    >
                      Documento do Aluno
                    </FieldButton>
                    <FieldButton
                      variant="outlined"
                      name='finishedAt'
                      onClick={(e) => handleShowStates(e)}
                    >
                      Data de Término
                    </FieldButton>
                    <FieldButton
                      name='courseName'
                      variant="outlined"
                      onClick={(e) => handleShowStates(e)}
                    >
                      Nome do Curso
                    </FieldButton>
                    <FieldButton
                      name='mentorName'
                      variant="outlined"
                      onClick={(e) => handleShowStates(e)}
                    >
                      Seu Nome
                    </FieldButton>
                  </ButtonsWrapper>
                </div>
                <FileWrapper id="dragRef">
                  <PDFReader file={files?.data} />

                  {show.showName && (
                    <Draggable
                      bounds="parent"
                      onStop={(e) => handleStopDraging(e)}
                    >
                      <DraggableItem
                        sx={{
                          border: `${isStoped.stopedName && '1px dotted black'
                            }`,
                        }}
                      >
                        {nameElement}
                      </DraggableItem>
                    </Draggable>
                  )}

                  {show.showDocument && (
                    <Draggable
                      bounds="parent"
                      onStop={(e) => handleStopDraging(e)}
                    >
                      <DraggableItem
                        sx={{
                          border: `${isStoped.stopedDocument && '1px dotted black'
                            }`,
                        }}
                      >
                        {documentElement}
                      </DraggableItem>
                    </Draggable>
                  )}

                  {show.showFinishedAt && (
                    <Draggable
                      bounds="parent"
                      onStop={(e) => handleStopDraging(e)}
                    >
                      <DraggableItem
                        sx={{
                          border: `${isStoped.stopedFinishedAt && '1px dotted black'
                            }`,
                        }}
                      >
                        {finishedAtElement}
                      </DraggableItem>
                    </Draggable>
                  )}
                  {show.showCourseName && (
                    <Draggable
                      bounds="parent"
                      onStop={(e) => handleStopDraging(e)}
                    >
                      <DraggableItem
                        sx={{
                          border: `${isStoped.stopedCourseName && '1px dotted black'
                            }`,
                        }}
                      >
                        {courseNameElement}
                      </DraggableItem>
                    </Draggable>
                  )}
                  {show.showMentorName && (
                    <Draggable
                      bounds="parent"
                      onStop={(e) => handleStopDraging(e)}
                    >
                      <DraggableItem
                        sx={{
                          border: `${isStoped.stopedMentorName && '1px dotted black'
                            }`,
                        }}
                      >
                        {mentorNameElement}
                      </DraggableItem>
                    </Draggable>
                  )}
                </FileWrapper>
              </Wrapper>
            )}
            {files?.length === 0 &&
              (
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
        )
      }
      {
        color && (
          <Wrapper>
            <FileWrapper id="dragRef">
              <PDFReader file={defaultCertificate.url} />
            </FileWrapper>
          </Wrapper>
        )
      }

    </form >

  );
};

export default Certificate;
