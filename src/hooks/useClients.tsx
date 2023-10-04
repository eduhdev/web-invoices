'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { getClients } from './clients';

export type Client = {
  id: number;
  name: string;
};

type ClientsContextData = {
  clients: Client[];
  loading: boolean;
};

const ClientsDefaultValues = {
  clients: [],
  loading: false,
};

export const ClientsContext =
  createContext<ClientsContextData>(ClientsDefaultValues);

const ClientsProvider = ({ children }: { children: React.ReactNode }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchClients = async () => {
    setLoading(true);
    const allClients = await getClients();
    setClients(allClients);
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <ClientsContext.Provider
      value={{
        clients,
        loading,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

const useClients = () => useContext(ClientsContext);

export { ClientsProvider, useClients };
