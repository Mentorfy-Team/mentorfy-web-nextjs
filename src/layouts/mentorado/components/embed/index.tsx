import Box from '@mui/material/Box';
import Image from 'next/image';
import Description from '~/components/atoms/ModalDescription';
import ModalComponent from '~/components/modules/Modal';
import { ModalDialogContent } from '~/components/modules/Modal/styles';
import TipBar from '~/components/modules/TipBar';
import { CalendalyWrapper, CloseButton } from './syles';
import ReactHtmlParser from 'react-html-parser';
import { InlineWidget } from 'react-calendly';

type InputProps = { id: string; value: boolean }[];
type ExtraProps = boolean;

type ToolData = string;

const Embed = ({
  open,
  setOpen,
  data: { data: taskData, title: titleData, description: descriptionData },
  onChange,
  userInput,
}: MentoredComponents.Props<ToolData, InputProps, ExtraProps>) => {
  const handleFinish = () => {
    onChange({
      data: {},
      extra: {
        finished: true,
      },
    });
    setOpen(false);
  };

  const HeadText = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Image
        alt="perguntas"
        src="/svgs/embed-icon.svg"
        height={20}
        width={22}
      />
      <>{titleData}</>
    </Box>
  );

  const GetUrl = (value) => {
    // find data-url attribute in the string and return it
    const url = value.match(/data-url="([^"]*)"/)[1];
    return url;
  };

  return (
    <ModalComponent open={open} setOpen={setOpen} title={HeadText} isMentorado>
      <ModalDialogContent isMentorado>
        {!taskData && (
          <TipBar>
            Ainda não há <span>nenhum conteúdo disponível</span> nossa etapa. Em
            caso de dúvidas, entre em contato com o suporte da mentoria.
          </TipBar>
        )}
        {taskData && <Description>{descriptionData}</Description>}
        {taskData &&
          // <EmbedHolder dangerouslySetInnerHTML={{ __html: taskData }} />
          (taskData.includes('calendly') ? (
            <CalendalyWrapper>
              <InlineWidget url={GetUrl(taskData)} />
            </CalendalyWrapper>
          ) : (
            <div>{ReactHtmlParser(taskData)}</div>
          ))}
        {!taskData && (
          <CloseButton onClick={handleFinish}>Concluir</CloseButton>
        )}
      </ModalDialogContent>
    </ModalComponent>
  );
};

export default Embed;
