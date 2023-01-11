import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import {
  DescriptionContainer,
  PlanContainer,
  PlanDescription,
  PlanTitle,
  PlansWrapper,
  TitleContainer,
} from '../../style';

// import { Container } from './styles';

const SubscriptionPlans = ({ data }: { data: Pagarme.Plan }) => {
  const info = {
    ...data,
    metadata: {
      member_areas: parseInt(data?.metadata?.member_areas?.toString()),
      active_clientes: parseInt(data?.metadata?.active_clientes?.toString()),
      lifetime_clientes: parseInt(
        data?.metadata?.lifetime_clientes?.toString(),
      ),
      support: data?.metadata?.support,
      team_members: parseInt(data?.metadata?.team_members?.toString()),
    },
  };

  const router = useRouter();
  return (
    <PlansWrapper>
      <PlanContainer>
        <TitleContainer>
          <PlanTitle>{info?.name}</PlanTitle>
        </TitleContainer>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          gap={3}
          pl={2}
          pr={2}
          pb={2}
          sx={{
            placeContent: 'space-between',
          }}
        >
          <DescriptionContainer>
            <PlanDescription>Área de Membros exclusiva</PlanDescription>
            <PlanDescription>
              {info?.metadata?.member_areas
                ? `Criação de até ${info?.metadata?.member_areas} mentorias`
                : 'Criação de Mentorias ilimitadas'}
            </PlanDescription>
            <PlanDescription>Clientes ilimitados</PlanDescription>
            <PlanDescription>
              Suporte {info?.metadata?.support != 'basic' && '24h'} via Whatsapp
            </PlanDescription>
            <PlanDescription>
              {info?.metadata?.team_members
                ? `${info?.metadata?.team_members} Membros na equipe`
                : 'Membros na equipe ilimitados'}
              <p
                style={{
                  color: '#727272',
                }}
              >
                (time de mentores)
              </p>
            </PlanDescription>

            <PlanDescription>Cancelar quando quiser</PlanDescription>
          </DescriptionContainer>
          <Button
            variant="contained"
            color="primary"
            sx={{}}
            onClick={async () => {
              await router.prefetch('/checkout/' + info.id);
              await router.push('/checkout/' + info.id);
            }}
          >
            Assinar agora
          </Button>
        </Box>
      </PlanContainer>
    </PlansWrapper>
  );
};

export default SubscriptionPlans;
