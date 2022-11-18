import React, { useCallback } from 'react';
import { useClients } from '~/hooks/useClients';
import ApprovalsTable from '../components/ApprovalsTable';

// import { Container } from './styles';

const Approvals: React.FC<{ user }> = ({ user }) => {
  const {
    clients,
    statistics,
    mutate,
    isLoading: isLoadingClient,
  } = useClients(user.id);

  const ProductsTableComponent = useCallback(() => {
    return (
      <ApprovalsTable
        rows={clients}
        clickSeeMore={(id) => {}}
        clickRemove={(id) => {}}
      />
    );
  }, [clients]);

  return <ProductsTableComponent />;
};

export default Approvals;
