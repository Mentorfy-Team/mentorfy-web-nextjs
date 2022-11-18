import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { GetAuthSession } from '~/helpers/AuthSession';
import {
  Bundle,
  BundleMonth,
  BundleTitle,
  ImageWrapper,
  ScrollArea,
  Task,
  TasksWrapper,
  TasktTitle,
} from './styles';

const ContinuosMentoring = ({ id }) => {
  const mock = [
    {
      id: 0,
      title: 'Madrugada',
      rows: [
        {
          id: 0,
          title: 'Aula 01',
        },
        {
          id: 0,
          title: 'Aula 02',
        },
        {
          id: 0,
          title: 'Aula 03',
        },
        {
          id: 0,
          title: 'Aula 04',
        },
      ],
    },
  ];
  return (
    <>
      <Toolbar breadcrumbs={['Minhas mentorias', 'Método 4S']} />
      <ContentWidthLimit maxWidth={1200}>
        <ScrollArea>
          {mock.map((group) => (
            <Bundle key={group.id}>
              <ImageWrapper>
                <Image
                  alt="imagem"
                  width={50}
                  height={50}
                  src="/svgs/step-image.svg"
                />
                <BundleTitle>{group.title}</BundleTitle>
                <BundleMonth>Janeiro</BundleMonth>
              </ImageWrapper>

              <TasksWrapper>
                {group.rows.map((task) => (
                  <Task key={task.id}>
                    <TasktTitle>{task.title}</TasktTitle>
                    <Image
                      alt="imagem"
                      width={15}
                      height={15}
                      src="/svgs/done.svg"
                    />
                  </Task>
                ))}
              </TasksWrapper>
            </Bundle>
          ))}
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

export default ContinuosMentoring;
