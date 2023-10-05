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
  getClientName: (id: number) => string | undefined;
};

const ClientsDefaultValues = {
  clients: [],
  loading: false,
  addNewClient: () => null,
  getClientName: () => undefined,
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
    const newClient = await addClient({ id: clients.length + 1, name });
    setClients((allClients) => [...allClients, newClient]);
    setLoading(false);
  };

  const getClientName = (id: number) =>
    clients.find((client) => client.id === id)?.name;

  return (
    <ClientsContext.Provider
      value={{
        clients,
        loading,
        addNewClient,
        getClientName,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

const useClients = () => useContext(ClientsContext);

export { ClientsProvider, useClients };
