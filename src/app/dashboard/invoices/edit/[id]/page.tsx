'use client';
import CreateEditInvoice from '@/components/CreateEditInvoice';
import { Invoice, useInvoices } from '@/hooks/useInvoices';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditInvoicePage = ({ params }: { params: { id: string } }) => {
  const [invoice, setInvoice] = useState<Invoice | undefined>(undefined);
  const { getInvoiceById, allInvoices } = useInvoices();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (allInvoices.length > 0) {
      const getInvoice = getInvoiceById(Number(params.id));
      if (!getInvoice) router.push('/dashboard/invoices');
      setInvoice(getInvoice);
      setLoading(false)
    }
  }, [params.id, allInvoices]);
  if (loading) return <p>Loading</p>;

  return <CreateEditInvoice invoice={invoice} />;
};

export default EditInvoicePage;
