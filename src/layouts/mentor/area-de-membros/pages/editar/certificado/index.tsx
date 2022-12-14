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

type CustomInfo = {
  name: boolean;
  document: boolean;
  finishedAt: boolean;
  courseName: boolean;
  mentorName: boolean;
};

type CustomInfoSize = {
  name: number;
  document: number;
  finishedAt: number;
  courseName: number;
  mentorName: number;
};

const Certificate = ({ id }) => {
  const { handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [color, setColor] = useState(false);
  const theme = useTheme();
  const [files, setFiles] = useState<FileType[]>([]);
  const [show, setShow] = useState<Partial<CustomInfo>>();
  const [isStoped, setIsStoped] = useState<Partial<CustomInfo>>();
  const [fontSize, setFontSize] = useState<Partial<CustomInfoSize>>({
    name: 14,
    document: 14,
    finishedAt: 14,
    courseName: 14,
    mentorName: 14,
  });
  const [certificate, setCertificate] =
    useState<ProductTypes.CertificateBuilder>();

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
  const handleUpload = (_files: any) => {
    HandleFileUpload(_files, (file) => {
      setFiles(file);
    });
  };

  const handleShowStates = (e) => {
    // * dinamicamente seta o nome do atributo dentro do state com status true
    setShow((oldStates) => ({
      ...oldStates,
      [e.target.getAttribute('name')]: true,
    }));

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

  const formatObj = (e, state, categoryName, fieldName) => {
    return {
      ...state,
      [categoryName]: {
        ...state?.student,
        [fieldName]: {
          pageX: e.layerX,
          pageY: e.layerY,
        },
      },
    };
  };

  const handleStopDraging = (e, categoryName) => {
    setIsStoped((oldStates) => ({ ...oldStates, [e.target.id]: true }));
    setCertificate((old) => formatObj(e, old, categoryName, e.target.id));
  };

  const handleSizeChange = (categoryName, fieldName, value) => {
    setFontSize((old) => ({ ...old, [fieldName]: value }));
    setCertificate((state) => {
      return {
        ...state,
        [categoryName]: {
          ...state?.student,
          [fieldName]: {
            fontSize: value,
          },
        },
      };
    });
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

  const nameElement = (value) => (
    <DocumentText
      sx={{
        fontSize: value,
      }}
      id="name"
    >
      NOME DO CLIENTE
    </DocumentText>
  );
  const documentElement = (value) => (
    <DocumentText
      sx={{
        fontSize: value,
      }}
      id="document"
    >
      DOCUMENTO DO ALUNO
    </DocumentText>
  );
  const finishedAtElement = (value) => (
    <DocumentText
      sx={{
        fontSize: value,
      }}
      id="finishedAt"
    >
      DATA DE TÉRMINO
    </DocumentText>
  );
  const courseNameElement = (value) => (
    <DocumentText
      sx={{
        fontSize: value,
      }}
      id="courseName"
    >
      NOME DO CURSO
    </DocumentText>
  );
  const mentorNameElement = (value) => (
    <DocumentText
      sx={{
        fontSize: value,
      }}
      id="owner"
    >
      SEU NOME
    </DocumentText>
  );

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
                {show?.name && (
                  <DragBox
                    fontSize={fontSize.name}
                    onSizeChange={(value) =>
                      handleSizeChange('student', 'name', value)
                    }
                    element={nameElement}
                    showBorder={isStoped?.name}
                    onStopDrag={(e) => handleStopDraging(e, 'student')}
                  />
                )}
                {show?.document && (
                  <DragBox
                    fontSize={fontSize.document}
                    onSizeChange={(value) =>
                      handleSizeChange('student', 'document', value)
                    }
                    element={documentElement}
                    showBorder={isStoped?.document}
                    onStopDrag={(e) => handleStopDraging(e, 'student')}
                  />
                )}
                {show?.finishedAt && (
                  <DragBox
                    fontSize={fontSize.finishedAt}
                    onSizeChange={(value) =>
                      handleSizeChange('student', 'finishedAt', value)
                    }
                    element={finishedAtElement}
                    showBorder={isStoped?.finishedAt}
                    onStopDrag={(e) => handleStopDraging(e, 'student')}
                  />
                )}
                {show?.courseName && (
                  <DragBox
                    fontSize={fontSize.courseName}
                    onSizeChange={(value) =>
                      handleSizeChange('course', 'courseName', value)
                    }
                    element={courseNameElement}
                    showBorder={isStoped?.courseName}
                    onStopDrag={(e) => handleStopDraging(e, 'course')}
                  />
                )}
                {show?.mentorName && (
                  <DragBox
                    fontSize={fontSize.mentorName}
                    onSizeChange={(value) =>
                      handleSizeChange('course', 'mentorName', value)
                    }
                    element={mentorNameElement}
                    showBorder={isStoped?.mentorName}
                    onStopDrag={(e) => handleStopDraging(e, 'course')}
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
