import React, { useCallback, useEffect } from 'react';
import { useClients } from '@app/hooks/useClients';
import ApprovalsTable from '../components/ApprovalsTable';
import { TipText, TipWrapper } from './styles';
import NextImage from 'next/image';
import { ApprovalClient } from '@app/services/client.service';
import { userStore } from '@app/stores';
// import { Container } from './styles';

const Approvals: React.FC<{ user }> = ({ user }) => {
  const {
    clients,
    statistics,
    mutate,
    isLoading: isLoadingClient,
  } = useClients(user.id, true);
  const { setLoading } = userStore();

  useEffect(() => {
    setLoading(isLoadingClient);
  }, [isLoadingClient, setLoading]);

  const ProductsTableComponent = useCallback(() => {
    return (
      <>
        <TipWrapper>
          <NextImage
            alt="tip-icon"
            src="/svgs/tip-icon.svg"
            width={22}
            height={22}
          />
          <TipText>
            Os clientes abaixo estão <span>solicitando acesso a mentorias</span>
            . Aprove ou rejeite as solicitações conforme necessário.
          </TipText>
        </TipWrapper>
        <ApprovalsTable
          rows={clients}
          onApprovalDone={async (id, product_id, approved) => {
            setLoading(true);
            await ApprovalClient(id, product_id, approved);
            await mutate();
          }}
        />
      </>
    );
  }, [clients, mutate, setLoading]);

  return <ProductsTableComponent />;
};

export default Approvals;
