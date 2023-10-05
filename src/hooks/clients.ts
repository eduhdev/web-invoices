import { Client } from './useClients';

async function getClients() {
  try {
    const response = await fetch('/api/clients');
    if (!response.ok) {
      throw new Error('Failed to fetch clients');
    }
    const clients = await response.json();
    return clients;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function addClient(client: Client) {
  const postOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client),
  };

  try {
    const response = await fetch('/api/clients', postOptions);
    if (!response.ok) {
      throw new Error('Failed to fetch clients');
    }
    const client = await response.json();
    return client;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getClients, addClient };
