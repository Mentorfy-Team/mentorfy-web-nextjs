import { FC, useCallback, useState } from 'react';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';

type Props = PageTypes.Props & {
  data: MentorTools.ToolData[];
  product: ProductTypes.Product;
  id: string;
};
import ConfigPage from '~/layouts/mentor/area-de-membros/pages/editar/configuracao';
import StepsPage from '~/layouts/mentor/area-de-membros/pages/editar/etapas';
import ClientJourney from './jornada-do-cliente';
import Links from './links';
import { GetAuthSession } from '~/helpers/AuthSession';
import Certificate from './certificado';
import { GetProduct } from '~/services/product.service';

const EditarMentoria: FC<Props> = ({ id, product, user }) => {
  const [tabindex, setTabindex] = useState(product.owner == user.id ? 0 : 1);
  const [tabs] = useState([
    'Etapas',
    'Jornada do Cliente',
    'Configuração',
    'Certificado',
    'Links',
  ]);

  const SwitchTabs = useCallback(() => {
    switch (tabindex) {
      case 4:
        return <Links id={id} />;
      case 3:
        return <Certificate id={id} product={product} />;
      case 2:
        return <ConfigPage id={id} />;
      case 1:
        return <ClientJourney id={id} />;
      case 0:
        return <StepsPage id={id} product={product} />;
      default:
        return <div />;
    }
  }, [id, product, tabindex]);

  const MaxWidth = tabindex != 1 && tabindex != 3 && 700;
  console.log(product.owner, user.id);
  return (
    <>
      {(!product.owner || product.owner == user.id) && (
        <Toolbar onChange={(value) => setTabindex(value)} tabs={tabs} />
      )}
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

  const response = await GetProduct(ctx.req, ctx.query.id);
  if (!response)
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
      product: response,
    },
  };
};

export default EditarMentoria;
