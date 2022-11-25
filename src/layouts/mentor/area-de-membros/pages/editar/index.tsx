import { FC, useCallback, useState } from 'react';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';

type Props = PageTypes.Props & {
  data: MentorTools.ToolData[];
  id: string;
};
import ConfigPage from '~/layouts/mentor/area-de-membros/pages/editar/configuracao';
import StepsPage from '~/layouts/mentor/area-de-membros/pages/editar/etapas';
import ClientJourney from './jornada-do-cliente';
import Links from './links';
import { GetAuthSession } from '~/helpers/AuthSession';
import Certificate from './certificado';

const tabs = [
  'Etapas',
  'Jornada do Cliente',
  'Configuração',
  'Certificado',
  'Links',
];
const EditarMentoria: FC<Props> = ({ id }) => {
  const [tabindex, setTabindex] = useState(0);

  const SwitchTabs = useCallback(() => {
    switch (tabindex) {
      case 4:
        return <Links id={id} />;
      case 3:
        return <Certificate id={id} />;
      case 2:
        return <ConfigPage id={id} />;
      case 1:
        return <ClientJourney id={id} />;
      case 0:
        return <StepsPage id={id} />;
      default:
        return <StepsPage id={id} />;
    }
  }, [id, tabindex]);

  const MaxWidth = tabindex != 1 && 600;
  return (
    <>
      <Toolbar onChange={(value) => setTabindex(value)} tabs={tabs} />
      <ContentWidthLimit maxWidth={MaxWidth}>{SwitchTabs()}</ContentWidthLimit>
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

  return {
    props: {
      id: ctx.query.id,
      user: session.user,
    },
  };
};

export default EditarMentoria;
