import ChavronLeftSvg from '~/../public/svgs/chavron-left';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import Save from '@mui/icons-material/Save';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { MentorRoutes } from '~/consts';
import { useEffect, useRef, useState } from 'react';
import InputField from '~/components/atoms/InputField';
import HandleFileUpload from '~/helpers/HandleFileUpload';

import {
  BpCheckedIcon,
  BpIcon,
  ButtonsWrapper,
  CheckText,
  CheckWrapper,
  DocumentButton,
  DocumentText,
  DraggableItem,
  FileWrapper,
  Label,
  NameButton,
  NameText,
  P,
  ReturnButton,
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
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Draggable from 'react-draggable';

const PDFReader = dynamic(
  () => import('~/components/atoms/PDFReader/PDFReader'),
  {
    ssr: false,
  },
);

const Certificate = ({ id }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const route = useRouter();
  const [title, setTitle] = useState<string>('');
  const [color, setColor] = useState(false);
  const theme = useTheme();
  const [files, setFiles] = useState<string>('');
  const [position, setPosition] = useState<number>(0);
  const [positionY, setPositionY] = useState<number>(0);
  const [showName, setShowName] = useState(false);
  const [showDocument, setShowDocument] = useState(false);
  const [nameRef, setNameRef] = useState<HTMLElement>(false);
  const WrapperRef = useRef(null);
  const elementDocument = useRef(null);

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
      setFiles(file.data);
    });
    console.log(files);
  };

  const nameElement = <NameText>NOME DO CLIENTE</NameText>;
  const documentElement = <DocumentText>DOCUMENTO DO CLIENTE</DocumentText>;

  useEffect(() => {
    const el = document.getElementById('dragRef');
    console.log({
      bottom: nameRef?.offsetHeight,
      left: -nameRef?.offsetWidth / 2,
      right: nameRef?.offsetWidth / 2,
      top: 0,
    });
    if (el) setNameRef(el);
  }, [nameRef?.offsetHeight, nameRef?.offsetWidth]);

  return (
    <ContentWidthLimit>
      <form onSubmit={() => {}}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          pb={2}
        >
          <ReturnButton
            color="primary"
            onClick={() => route.push(MentorRoutes.products)}
          >
            <ChavronLeftSvg />
            <span>Voltar</span>
          </ReturnButton>
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
          onClick={() => {
            setColor(!color);
            setFiles('');
          }}
        >
          <BpCheckbox />
          <CheckText sx={{ color: `${color && '#7DDC51'}` }}>
            Usar certificado padrão Mentorfy
          </CheckText>
        </CheckWrapper>

        {color ? null : (
          <>
            {files ? (
              <Wrapper>
                <div>
                  <UsageText>
                    Clique no botão <strong>Adicionar Nome</strong> para
                    adicionar o campo nome ao certificado, em seguida arraste-o
                    para o local exato em que o nome do seu cliente deve ficar.
                    Faça o mesmo com o documento
                  </UsageText>
                  <ButtonsWrapper>
                    <NameButton
                      variant="outlined"
                      onClick={() => setShowName(true)}
                    >
                      Adicionar Nome
                    </NameButton>
                    <DocumentButton
                      variant="outlined"
                      onClick={() => setShowDocument(true)}
                    >
                      Adicionar Documento
                    </DocumentButton>
                  </ButtonsWrapper>
                </div>
                <FileWrapper id="dragRef">
                  <PDFReader file={files} />

                  <Draggable bounds="parent">
                    <DraggableItem>{nameElement}</DraggableItem>
                  </Draggable>
                  {/* <div
                    ref={elementDocument}
                    draggable={true}
                    onDragStart={() => handleDragStart()}
                    style={{ position: 'absolute' }}
                  >
                    {documentElement}
                  </div> */}
                </FileWrapper>
              </Wrapper>
            ) : (
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
      </form>
    </ContentWidthLimit>
  );
};

export default Certificate;
