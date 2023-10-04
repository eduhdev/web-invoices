async function getClients() {
  try {
    const response = await fetch("/api/clients");
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

export { getClients };
