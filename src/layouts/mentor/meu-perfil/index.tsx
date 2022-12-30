import { FC, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';

import GeralPage from './tabs/geral';
import { GetAuthSession } from '~/helpers/AuthSession';
import { useProfile } from '~/hooks/useProfile';
import Signature from './tabs/assinaturas';
import { GetProfileById } from '~/backend/repositories/user/GetProfileById';
import { SupabaseServer } from '~/backend/supabase';
import { GetCustomer } from '~/backend/repositories/pagarme/customer/GetCustomer';
import { GetPlan } from '~/backend/repositories/pagarme/plan/GetPlan';

const DadosPage = dynamic(() => import('./tabs/dados-cadastro'));

enum tabs {
  'Geral',
  'Links',
  'Assinatura',
}

type props = PageTypes.Props & {
  product: ProductClient.Product;
  tab: number;
  mentored_id?: string;
  mentor_id?: string;
  isViewingMentored: boolean;
  isViewingMentor: boolean;
  plan: Pagarme.Plan;
  customer: Pagarme.Customer;
};

const MinhaConta: FC<props> = ({
  user,
  tab = tabs.Geral.valueOf(),
  isViewingMentored,
  isViewingMentor,
  mentored_id,
  mentor_id,
  plan,
  customer,
}) => {
  const [tabindex, setTabindex] = useState<number>(tab);
  const {
    data: { profile, address },
  } = useProfile(true, mentored_id || mentor_id || user.id);

  const SwitchTabs = useCallback(() => {
    if (!profile) return null;
    console.log(tabindex, tab, tabs.Assinatura.valueOf());
    switch (tabindex) {
      case tabs.Geral.valueOf():
        return (
          <GeralPage
            isViewingMentored={isViewingMentored}
            isViewingMentor={isViewingMentor}
            user={user}
            profile={profile}
          />
        );
      case tabs.Links.valueOf():
        return <DadosPage profile={profile} address={address} />;
      case tabs.Assinatura.valueOf():
        return <Signature customer={customer} profile={profile} plan={null} />;
      default:
        return (
          <GeralPage
            isViewingMentored={isViewingMentored}
            isViewingMentor={isViewingMentor}
            user={user}
            profile={profile}
          />
        );
    }
  }, [
    address,
    customer,
    isViewingMentor,
    isViewingMentored,
    plan,
    profile,
    tabindex,
    user,
    tab,
  ]);

  return (
    <>
      <Toolbar
        onChange={(value) => setTabindex(parseInt(value))}
        initialTab={tab}
        tabs={
          isViewingMentor || isViewingMentored
            ? ['Perfil']
            : [
                'Perfil',
                'Dados de Cadastro',
                profile?.access_type === 'mentor' ? 'Assinatura' : '',
              ]
        }
      />
      <ContentWidthLimit>
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.primary.light,
            borderRadius: 1,
          }}
        >
          {SwitchTabs()}
        </Box>
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

  const supabase = SupabaseServer(ctx.req, ctx.res);
  const { profile } = await GetProfileById(supabase, {
    id: session.user.id,
  });
  let customer: Pagarme.Customer = null;
  customer = await GetCustomer(profile.customer_id);

  const plan = await GetPlan(profile.plan_id);

  return {
    props: {
      user: session.user,
      mentored_id: ctx.query.altId ?? null,
      mentor_id: ctx.query.id ?? null,
      isViewingMentored: !!ctx.query.altId,
      isViewingMentor: !!ctx.query.id,
      customer: customer,
      plan: plan,
      tab: ctx.query.tab ?? tabs.Geral.toString(),
    },
  };
};

export default MinhaConta;
