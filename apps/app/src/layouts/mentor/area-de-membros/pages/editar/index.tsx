import { FC, useCallback, useState } from 'react';
import ContentWidthLimit from '@app/components/modules/ContentWidthLimit';
import Toolbar from '@app/components/modules/Toolbar';

type Props = PageTypes.Props & {
  data: MentorTools.ToolData[];
  product: ProductTypes.Product;
  id: string;
};
import ConfigPage from '@app/layouts/mentor/area-de-membros/pages/editar/configuracao';
import StepsPage from '@app/layouts/mentor/area-de-membros/pages/editar/etapas';
import ClientJourney from './jornada-do-cliente';
import Links from './links';
import { GetAuthSession } from '@app/helpers/AuthSession';
import Certificate from './certificado';
import { GetProductById } from '@app/backend/repositories/product/GetProductById';
import { SupabaseServer } from '@app/backend/supabase';

const EditarMentoria: FC<Props> = ({ id, product, user }) => {
  const [tabindex, setTabindex] = useState(product.owner == user.id ? 0 : 1);
  const [tabs] = useState([
    'Etapas',
    'Jornada do Cliente',
    'Configuração',
    'Links',
    'Certificado',
  ]);

  const SwitchTabs = useCallback(() => {
    switch (tabindex) {
      case 3:
        return <Links id={id} />;
      case 4:
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

  const MaxWidth = tabindex != 1 && tabindex != 4 && 700;

  return (
    <>
      {product.owner == user.id && (
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

  if (!session || !ctx.query.id)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  const supabase = SupabaseServer(ctx.req, ctx.res);
  const product = await GetProductById(supabase, {
    id: ctx.query.id,
  });

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
