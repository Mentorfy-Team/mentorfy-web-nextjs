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
import { DefaultCertificate } from '~/consts/certificate';
import { toast } from 'react-toastify';
import { DragBox } from './components/DragBox';
import { SingFont } from '~/pages/_app';
import { UpdateCertificate } from '~/services/certificate-upload.service';

import NextImage from 'next/image';
import { Button } from '@mui/material';
import UploadToUrlFiles from '../../../components/UploadFileModal/helpers/UploadToUrlFiles';

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
  course: boolean;
  owner: boolean;
};

type CustomInfoSize = {
  student: { name: number; document: number; finishedAt: number };
  course: {
    name: number;
    owner: number;
  };
};

type Props = {
  id: string;
  product: ProductTypes.Product;
};

const Certificate = ({
  id,
  product: { title: productTitle, profile, certificate: initCertificate },
}: Props) => {
  const { handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(initCertificate?.title || '');
  const [color, setColor] = useState(false);
  const theme = useTheme();

  const [files, setFiles] = useState<FileType>({
    id: '0',
    data: initCertificate?.url,
    name: initCertificate?.title,
    type: 'pdf',
    file: null,
    size: null,
  });

  const [show, setShow] = useState<Partial<CustomInfo>>({
    name: !!initCertificate?.student?.name,
    document: !!initCertificate?.student?.document,
    finishedAt: !!initCertificate?.student?.finishedAt,
    course: !!initCertificate?.course?.name,
    owner: !!initCertificate?.course?.owner,
  });
  const [isStoped, setIsStoped] = useState<Partial<CustomInfo>>();
  const [fontSize, setFontSize] = useState<Partial<CustomInfoSize>>({
    student: {
      name: initCertificate?.student?.name?.fontSize || 14,
      document: initCertificate?.student?.document?.fontSize || 14,
      finishedAt: initCertificate?.student?.finishedAt?.fontSize || 14,
    },
    course: {
      name: initCertificate?.course?.name?.fontSize || 14,
      owner: initCertificate?.course?.owner?.fontSize || 14,
    },
  });
  const [certificate, setCertificate] =
    useState<ProductTypes.CertificateBuilder>(initCertificate || ({} as any));

  const [defaultCertificate, setDefaultCertificate] =
    useState<ProductTypes.Certificate>(DefaultCertificate);

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
        course: false,
        owner: false,
      });
      setColor(!color);
      setFiles(null);
      setTitle('');
      setCertificate({} as any);
    }
  };

  const formatObj = (
    { pageX, pageY, boxSize },
    state,
    categoryName,
    fieldName,
  ) => {
    const stateCategory = state[categoryName];
    const stateField = stateCategory ? stateCategory[fieldName] : null;
    return {
      ...state,
      [categoryName]: {
        ...stateCategory,
        [fieldName]: {
          ...stateField,
          pageX,
          pageY,
          boxSize,
        },
      },
    };
  };

  const handleStopDraging = (e, categoryName, fieldName) => {
    const boxRef = e.target.offsetParent as HTMLElement;
    const transform = window.getComputedStyle(boxRef).transform;
    if (!transform.split('(') || transform.split('(').length < 2) return;
    // get x and y values from transform matrix
    const matrix = transform.split('(')[1].split(')')[0].split(',');
    const pageX = matrix[4];
    const pageY = matrix[5];
    const boxSize = boxRef.getBoundingClientRect().width;

    setIsStoped((oldStates) => ({ ...oldStates, [fieldName]: true }));
    setCertificate((state) =>
      formatObj({ pageX, pageY, boxSize }, state, categoryName, fieldName),
    );
  };

  const handleSizeChange = (categoryName, fieldName, value) => {
    setFontSize((old) => ({
      ...old,
      [categoryName]: { ...old[categoryName], [fieldName]: value },
    }));
    const stateCategory = certificate[categoryName];
    const stateField = stateCategory ? stateCategory[fieldName] : null;
    setCertificate((state) => {
      const format = {
        ...state,
        [categoryName]: {
          ...stateCategory,
          [fieldName]: {
            ...stateField,
            fontSize: value,
          },
        },
      };
      return format;
    });
  };

  useEffect(() => {
    if (color) {
      setDefaultCertificate((old) => {
        return {
          ...old,
        };
      });
      return;
    }
  }, [color, files, id, title]);

  const onSubmit = async () => {
    if (color) {
      await UpdateCertificate(defaultCertificate, title, id);
    } else {
      if (!files && !files?.sourceUrl && !files?.data) {
        await UpdateCertificate(certificate, title, id);
      } else {
        const convertedFiles = await UploadToUrlFiles([files], id);

        const updatedCertificate = {
          ...certificate,
          url: convertedFiles[0].sourceUrl,
          product_id: id,
          title: title,
        };
        await UpdateCertificate(updatedCertificate, title, id);
      }
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
      [ Nome do Aluno ]
    </DocumentText>
  );
  const documentElement = (value) => (
    <DocumentText
      sx={{
        fontSize: value,
      }}
      id="document"
    >
      [ DOCUMENTO DO ALUNO ]
    </DocumentText>
  );
  const finishedAtElement = (value) => (
    <DocumentText
      sx={{
        fontSize: value,
      }}
      id="finishedAt"
    >
      [ Data de Término ]
    </DocumentText>
  );
  const courseNameElement = (value) => (
    <DocumentText
      sx={{
        fontSize: value,
      }}
      id="course"
    >
      {productTitle}
    </DocumentText>
  );
  const mentorNameElement = (value) => (
    <DocumentText
      sx={{
        fontSize: value,
        ...SingFont.style,
      }}
      id="owner"
    >
      {profile.name}
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
        <p style={{ color: 'gray', fontSize: '0.8rem' }}>
          (AO CLICAR, QUALQUER CERTIFICADO ANTERIOR SERÁ APAGADO!)
        </p>
      </CheckWrapper>

      {!color && (
        <>
          {files?.data && !files?.data?.includes('.pdf') && (
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
                    name="course"
                    variant="outlined"
                    onClick={(e) => handleShowStates(e)}
                  >
                    Nome do Curso
                  </FieldButton>
                  <FieldButton
                    name="owner"
                    variant="outlined"
                    onClick={(e) => handleShowStates(e)}
                  >
                    Seu Nome
                  </FieldButton>
                </ButtonsWrapper>
              </div>
              <Button
                sx={{
                  color: 'red',
                  padding: '0.5rem 1rem',
                }}
                onClick={() => setFiles(null)}
              >
                Remover
              </Button>
              <FileWrapper id="dragRef">
                <NextImage
                  src={(files as any)?.data}
                  width={790}
                  height={590}
                  alt="certificado"
                />
                {show?.name && (
                  <DragBox
                    position={initCertificate?.student.name}
                    fontSize={fontSize.student.name}
                    onSizeChange={(value) =>
                      handleSizeChange('student', 'name', value)
                    }
                    element={nameElement}
                    showBorder={isStoped?.name}
                    onStopDrag={(e) => handleStopDraging(e, 'student', 'name')}
                  />
                )}
                {show?.document && (
                  <DragBox
                    position={initCertificate?.student.document}
                    fontSize={fontSize.student.document}
                    onSizeChange={(value) =>
                      handleSizeChange('student', 'document', value)
                    }
                    element={documentElement}
                    showBorder={isStoped?.document}
                    onStopDrag={(e) =>
                      handleStopDraging(e, 'student', 'document')
                    }
                  />
                )}
                {show?.finishedAt && (
                  <DragBox
                    position={initCertificate?.student.finishedAt}
                    fontSize={fontSize.student.finishedAt}
                    onSizeChange={(value) =>
                      handleSizeChange('student', 'finishedAt', value)
                    }
                    element={finishedAtElement}
                    showBorder={isStoped?.finishedAt}
                    onStopDrag={(e) =>
                      handleStopDraging(e, 'student', 'finishedAt')
                    }
                  />
                )}
                {show?.course && (
                  <DragBox
                    position={initCertificate?.course.name}
                    fontSize={fontSize.course.name}
                    onSizeChange={(value) =>
                      handleSizeChange('course', 'name', value)
                    }
                    element={courseNameElement}
                    showBorder={isStoped?.course}
                    onStopDrag={(e) => handleStopDraging(e, 'course', 'name')}
                  />
                )}
                {show?.owner && (
                  <DragBox
                    position={initCertificate?.course.owner}
                    fontSize={fontSize.course.owner}
                    onSizeChange={(value) =>
                      handleSizeChange('course', 'owner', value)
                    }
                    element={mentorNameElement}
                    showBorder={isStoped?.owner}
                    onStopDrag={(e) => handleStopDraging(e, 'course', 'owner')}
                  />
                )}
              </FileWrapper>
            </Wrapper>
          )}
          {(!files?.data || files?.data?.includes('.pdf')) && (
            <DropzoneComponent
              accepts={{ image: ['image/jpeg', 'image/png', 'image/jpg'] }}
              onDrop={(_files) => handleUpload(_files)}
            >
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
                  <div
                    style={{
                      color: 'red',
                      fontSize: '0.8rem',
                    }}
                  >
                    Dimenções: 1580 x 1180
                  </div>
                  <P>
                    Tamanho máximo de 40mb (No momento, apenas JPG, PJEG e PNG.){' '}
                  </P>
                </Label>
              </UploadField>
            </DropzoneComponent>
          )}
        </>
      )}
      {color && (
        <Wrapper>
          <FileWrapper id="dragRef">
            <NextImage
              src={defaultCertificate.url}
              width={790}
              height={590}
              alt="certificado"
            />
          </FileWrapper>
        </Wrapper>
      )}
    </form>
  );
};

export default Certificate;
