'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { addClient, getClients } from './clients';

export type Client = {
  id: number;
  name: string;
};

type ClientsContextData = {
  clients: Client[];
  loading: boolean;
  addNewClient: ({ name }: { name: string }) => void;
};

const ClientsDefaultValues = {
  clients: [],
  loading: false,
  addNewClient: () => null,
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

  const addNewClient = async ({ name }: { name: string }) => {
    setLoading(true);
    const newClient = await addClient({ id: clients.length - 1, name });
    setClients((allClients) => [...allClients, newClient]);
    setLoading(false);
  };

  return (
    <ClientsContext.Provider
      value={{
        clients,
        loading,
        addNewClient,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

const useClients = () => useContext(ClientsContext);

export { ClientsProvider, useClients };
