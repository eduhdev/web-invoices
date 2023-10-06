import { Invoice } from './useInvoices';

async function getInvoices() {
  try {
    const response = await fetch('/api/invoice');
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

async function addInvoice(invoice: Invoice) {
  const postOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(invoice),
  };

  try {
    const response = await fetch('/api/invoice', postOptions);
    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }
    const invoice = await response.json();
    return invoice;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateInvoice(invoice: Invoice) {
  const postOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(invoice),
  };

  try {
    const response = await fetch('/api/invoice', postOptions);
    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }
    const invoice = await response.json();
    return invoice;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export { getInvoices, addInvoice, updateInvoice };
