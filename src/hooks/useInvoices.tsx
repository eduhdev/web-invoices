'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { addInvoice, getInvoices } from './invoices';

export type InvoiceFilter = 'all' | 'paid' | 'unpaid';
export type InvoiceStatus = Exclude<InvoiceFilter, 'all'>;
export type PostInvoice = Exclude<Invoice, 'id'>;

export type InvoiceItem = {
  id: number;
  description: string;
  amount: number;
};

export type Invoice = {
  id: number;
  clientId: number;
  status: InvoiceStatus;
  dueDate: number;
  items: InvoiceItem[];
};

type InvoiceContextData = {
  allInvoices: Invoice[];
  filteredInvoices: Invoice[];
  loading: boolean;
  currentTab: String;
  setCurrentTab: (tab: InvoiceFilter) => void;
  addNewInvoice: (invoice: Omit<Invoice, 'id'>) => void;
};

const InvoiceContextDefaultValues = {
  allInvoices: [],
  filteredInvoices: [],
  loading: false,
  currentTab: 'all',
  setCurrentTab: () => null,
  addNewInvoice: () => null,
};

export const InvoicesContext = createContext<InvoiceContextData>(
  InvoiceContextDefaultValues
);

const InvoicesProvider = ({ children }: { children: React.ReactNode }) => {
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<InvoiceFilter>('all');

  const fetchInvoices = async () => {
    setLoading(true);
    const invoices = await getInvoices();
    setAllInvoices(invoices);
    setFilteredInvoices(invoices);
    setLoading(false);
  };

  const filterInvoices = () => {
    if (currentTab === 'all') {
      setFilteredInvoices(allInvoices);
    } else {
      const filterInvoices = allInvoices.filter(
        (invoice) => invoice.status === currentTab
      );
      setFilteredInvoices(filterInvoices);
    }
  };

  const addNewInvoice = async (invoice: Omit<Invoice, 'id'>) => {
    const newInvoice = await addInvoice({
      id: allInvoices.length + 1,
      ...invoice,
    });
    setAllInvoices((currentInvoices) => [...currentInvoices, newInvoice]);
    setFilteredInvoices([...allInvoices, newInvoice]);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    if (allInvoices.length > 0) filterInvoices();
  }, [currentTab]);

  return (
    <InvoicesContext.Provider
      value={{
        allInvoices,
        filteredInvoices,
        loading,
        currentTab,
        addNewInvoice,
        setCurrentTab,
      }}
    >
      {children}
    </InvoicesContext.Provider>
  );
};

const useInvoices = () => useContext(InvoicesContext);

export { InvoicesProvider, useInvoices };
