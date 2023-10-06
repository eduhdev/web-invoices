'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { addInvoice, getInvoices, markAsPaidOrUnpaid, updateInvoice } from './invoices';

export type InvoiceFilter = 'all' | 'paid' | 'unpaid';
export type InvoiceStatus = boolean;
export type PostInvoice = Exclude<Invoice, 'id'>;

export type InvoiceItem = {
  id: number;
  description: string;
  amount: number;
};

export type Invoice = {
  id: number;
  clientId: number;
  paid: InvoiceStatus;
  dueDate: Date;
  items: InvoiceItem[];
};

type InvoiceContextData = {
  allInvoices: Invoice[];
  filteredInvoices: Invoice[];
  loading: boolean;
  currentTab: String;
  setCurrentTab: (tab: InvoiceFilter) => void;
  saveInvoice: (invoice: Omit<Invoice, 'id'> & { id?: number }) => void;
  getInvoiceById: (id: number) => Invoice | undefined;
  handlePaidStatus: (invoice: Invoice) => void;
};

const InvoiceContextDefaultValues = {
  allInvoices: [],
  filteredInvoices: [],
  loading: false,
  currentTab: 'all',
  setCurrentTab: () => null,
  saveInvoice: () => null,
  getInvoiceById: () => undefined,
  handlePaidStatus: () => null,
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
      const isPaid = currentTab === 'paid';
      const filterInvoices = allInvoices.filter((invoice) =>
        isPaid ? invoice.paid : !invoice.paid
      );
      setFilteredInvoices(filterInvoices);
    }
  };

  const saveInvoice = async (
    invoice: Omit<Invoice, 'id'> & { id?: number }
  ) => {
    let updatedInvoiceList: Invoice[];
    if(!invoice.items.length || !invoice.clientId) return
    
    if (invoice?.id) {
      const updatedInvoice = await updateInvoice(invoice as Invoice);
      updatedInvoiceList = allInvoices.map((item) =>
        invoice.id === item.id ? updatedInvoice : item
      );
      setAllInvoices(updatedInvoiceList);
      setFilteredInvoices(updatedInvoiceList);
    } else {
      const newInvoice = await addInvoice({
        ...invoice,
        id: allInvoices.length + 1,
      });
      updatedInvoiceList = [...allInvoices, newInvoice];
    }
    setAllInvoices(updatedInvoiceList);
    setFilteredInvoices(updatedInvoiceList);
    setCurrentTab('all');
  };

  const getInvoiceById = (id: number) => {
    const invoice: Invoice | undefined = allInvoices.find(
      (inv) =>   inv.id === id 
    );
    return {...invoice as Invoice, dueDate: new Date(invoice!.dueDate)};
  };

  const handlePaidStatus = async (invoice: Invoice) => {
    setLoading(true)
    const updatedInvoice = await markAsPaidOrUnpaid(invoice)
    const updatedInvoiceList = allInvoices.map((item) =>
        invoice.id === item.id ? updatedInvoice : item
      );
    setAllInvoices(updatedInvoiceList)
    setFilteredInvoices(updatedInvoiceList)
    setCurrentTab("all")
    setLoading(false)
  }
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
        saveInvoice,
        setCurrentTab,
        getInvoiceById,
        handlePaidStatus
      }}
    >
      {children}
    </InvoicesContext.Provider>
  );
};

const useInvoices = () => useContext(InvoicesContext);

export { InvoicesProvider, useInvoices };
