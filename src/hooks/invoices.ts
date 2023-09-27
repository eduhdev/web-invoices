async function getInvoices(filters: 'all' | 'paid' | 'unpaid') {
  try {
    const response = await fetch(`/api/invoice?filter=${filters || 'all'}`);
    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }
    const invoices = await response.json();
    return invoices;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getInvoices };
