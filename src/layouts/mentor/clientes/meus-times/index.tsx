import React, { useCallback, useEffect } from 'react';
import { useClients } from '~/hooks/useClients';
import { TipText, TipWrapper } from './styles';
import NextImage from 'next/image';
import { userStore } from '~/stores';
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
          <TipText>Em construção.</TipText>
        </TipWrapper>
        {/* <ApprovalsTable
          rows={clients}
          onApprovalDone={async (id, product_id, approved) => {
            await ApprovalClient(id, product_id, approved);
            await mutate();
          }}
        /> */}
      </>
    );
  }, []);

  return <ProductsTableComponent />;
};

export default Approvals;
