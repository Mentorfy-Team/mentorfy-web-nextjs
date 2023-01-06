import { FC, useCallback, useState } from 'react';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';

type Props = PageTypes.Props & {
  data: MentorTools.ToolData[];
  product: ProductTypes.Product;
  id: string;
  readOnly: boolean;
};
import ConfigPage from '~/layouts/mentor/area-de-membros/pages/editar/configuracao';
import StepsPage from '~/layouts/mentor/area-de-membros/pages/editar/etapas';
import ClientJourney from './jornada-do-cliente';
import Links from './links';
import { GetAuthSession } from '~/helpers/AuthSession';
import Certificate from './certificado';
import { GetProductById } from '~/backend/repositories/product/GetProductById';
import { SupabaseServer } from '~/backend/supabase';
import isReadOnly from '~/helpers/IsReadOnly';
import { CheckForSubscription } from '~/backend/repositories/subscription/CheckForSubscription';
import defaultUser from '~/consts/defaultUser';

const EditarMentoria: FC<Props> = ({ id, product, user, readOnly }) => {
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
        return <Certificate readOnly={readOnly} id={id} product={product} />;
      case 2:
        return <ConfigPage readOnly={readOnly} id={id} />;
      case 1:
        return <ClientJourney id={id} />;
      case 0:
        return <StepsPage readOnly={readOnly} id={id} product={product} />;
      default:
        return <div />;
    }
  }, [id, product, readOnly, tabindex]);

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

  const accesses = await CheckForSubscription({
    supabase,
    data: {
      user_id: session.user.id,
    },
  });

  let readOnly = isReadOnly(accesses);

  if (product.owner === defaultUser && defaultUser !== session.user.id) {
    readOnly = true;
  }

  return {
    props: {
      id: ctx.query.id,
      user: session.user,
      product,
      readOnly,
    },
  };
};

export default EditarMentoria;
