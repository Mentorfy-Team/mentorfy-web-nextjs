import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { GetAuthSession } from '~/helpers/AuthSession';
import {
  Bundle,
  BundleDescription,
  BundleTitle,
  ImageWrapper,
  ScrollArea,
  Task,
  TasksWrapper,
  TasktTitle,
} from './styles';

const VerticalKanban = ({ id }) => {
  return (
    <>
      <Toolbar breadcrumbs={['Minhas mentorias', 'Método 4S']} />
      <ContentWidthLimit maxWidth={650}>
        <ScrollArea>
          <Bundle>
            <ImageWrapper>
              <Image
                alt="imagem"
                width={90}
                height={90}
                src="/svgs/step-image.svg"
              />
              <BundleTitle>Madrugada</BundleTitle>
              <BundleDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                arcu urna vel in proin gravida pretium, at. Duis ornare
                dignissim massa ornare rutrum mauris. Odio mi vulputate lacus
                placerat aenean semper id a.
              </BundleDescription>
            </ImageWrapper>

            <TasksWrapper>
              <Task>
                <TasktTitle>
                  Ferramenta 1 - Encontro 1 - Sua mentoria aqui
                </TasktTitle>
                <Image
                  alt="imagem"
                  width={22}
                  height={22}
                  src="/svgs/done.svg"
                />
              </Task>
              <Task>
                <TasktTitle>
                  Ferramenta 1 - Encontro 1 - Sua mentoria aqui
                </TasktTitle>
                <Image
                  alt="imagem"
                  width={22}
                  height={22}
                  src="/svgs/done.svg"
                />
              </Task>
              <Task>
                <TasktTitle>
                  Ferramenta 1 - Encontro 1 - Sua mentoria aqui
                </TasktTitle>
                <Image
                  alt="imagem"
                  width={22}
                  height={22}
                  src="/svgs/done.svg"
                />
              </Task>
              <Task>
                <TasktTitle>
                  Ferramenta 1 - Encontro 1 - Sua mentoria aqui
                </TasktTitle>
                <Image
                  alt="imagem"
                  width={22}
                  height={22}
                  src="/svgs/done.svg"
                />
              </Task>
            </TasksWrapper>
          </Bundle>
        </ScrollArea>
      </ContentWidthLimit>
    </>
  );
};

// * ServerSideRender (SSR)
export const getProps = async (ctx) => {
  const { session } = await GetAuthSession(ctx);

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const id = ctx.query.id as string;
  return {
    props: {
      member_area_id: id,
    },
  };
};

export default VerticalKanban;
