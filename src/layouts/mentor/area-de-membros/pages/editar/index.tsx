import { FC, useCallback, useState } from 'react';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';

type Props = PageTypes.Props & {
  data: MentorTools.ToolData[];
  product: any;
  id: string;
};
import ConfigPage from '~/layouts/mentor/area-de-membros/pages/editar/configuracao';
import StepsPage from '~/layouts/mentor/area-de-membros/pages/editar/etapas';
import ClientJourney from './jornada-do-cliente';
import Links from './links';
import { GetAuthSession } from '~/helpers/AuthSession';
import Certificate from './certificado';
import { GetProduct } from '~/services/product.service';

const tabs = [
  'Etapas',
  'Jornada do Cliente',
  'Configuração',
  'Certificado',
  'Links',
];
const EditarMentoria: FC<Props> = ({ id, product }) => {
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
        return <StepsPage id={id} product={product} />;
      default:
        return <StepsPage id={id} product={product} />;
    }
  }, [id, product, tabindex]);

  const MaxWidth = tabindex != 1 && tabindex != 3 && 700;
  return (
    <>
      <Toolbar onChange={(value) => setTabindex(value)} tabs={tabs} />
      {tabindex != 0 && (
        <ContentWidthLimit maxWidth={MaxWidth}>
          {SwitchTabs()}
        </ContentWidthLimit>
      )}
      {tabindex == 0 && SwitchTabs()}
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

  const product = await GetProduct(ctx.req, ctx.query.id);

  if (!product)
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
      product,
    },
  };
};

export default EditarMentoria;
