import React, { useCallback } from 'react';
import { useClients } from '~/hooks/useClients';

// import { Container } from './styles';
import ClientsTable from '../components/ClientsTable';

const Approvals: React.FC<{ user }> = ({ user }) => {
  const {
    clients,
    statistics,
    mutate,
    isLoading: isLoadingClient,
  } = useClients(user.id);

  const ProductsTableComponent = useCallback(() => {
    return (
      <ClientsTable
        rows={clients}
        clickSeeMore={(id) => {}}
        clickRemove={(id) => {}}
      />
    );
  }, [clients]);

  return <ProductsTableComponent />;
};

export default Approvals;
