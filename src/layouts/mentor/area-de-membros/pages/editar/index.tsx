import { FC, useCallback, useState } from 'react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { DnDRow } from '~/components/modules/DragNDrop';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';

type Props = PageTypes.Props & {
  data: DnDRow[];
  id: string;
};
import ConfigPage from '~/layouts/mentor/area-de-membros/pages/editar/configuracao';
import StepsPage from '~/layouts/mentor/area-de-membros/pages/editar/etapas';
import { GetProfile } from '~/services/profile.service';
import ClientJourney from './jornada-do-cliente';

const tabs = ['Etapas', 'Jornada do Cliente', 'Configuração'];
const EditarMentoria: FC<Props> = ({ id }) => {
  const [tabindex, setTabindex] = useState(0);

  const SwitchTabs = useCallback(() => {
    switch (tabindex) {
      case 2:
        return <ConfigPage id={id}/>;
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
export const getProps = withPageAuth({
  authRequired: true,
  redirectTo: PublicRoutes.login,
  async getServerSideProps(ctx) {
    const { profile } = await GetProfile(ctx.req);
    return {
      props: {
        profile: profile,
        id: ctx.query.id,
      },
    };
  },
});

export default EditarMentoria;
