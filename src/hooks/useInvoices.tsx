'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { getInvoices } from './invoices';

export type InvoiceFilter = 'all' | 'paid' | 'unpaid';

export type InvoiceItem = {
  id: number;
  description: string;
  amount: number;
};

export type Invoice = {
  id: number;
  clientName: string;
  status: Exclude<InvoiceFilter, 'all'>;
  dueDate: number;
  items: InvoiceItem[];
};

type InvoiceContextData = {
  allInvoices: Invoice[];
  filteredInvoices: Invoice[];
  loading: boolean;
  currentTab: String;
  setCurrentTab: (tab: InvoiceFilter) => void;
};

const InvoiceContextDefaultValues = {
  allInvoices: [],
  filteredInvoices: [],
  loading: false,
  currentTab: 'all',
  setCurrentTab: () => null,
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
    const invoices = await getInvoices(currentTab);
    if (allInvoices.length === 0) {
      setAllInvoices(invoices);
    }
    setFilteredInvoices(invoices);
    setLoading(false);
  };

  useEffect(() => {
    fetchInvoices();
  }, [currentTab]);

  return (
    <InvoicesContext.Provider
      value={{
        allInvoices,
        filteredInvoices,
        loading,
        currentTab,
        setCurrentTab,
      }}
    >
      {children}
    </InvoicesContext.Provider>
  );
};

const useInvoices = () => useContext(InvoicesContext);

export { InvoicesProvider, useInvoices };
 