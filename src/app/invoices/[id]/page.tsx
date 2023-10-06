'use client';
import CreateEditInvoice from '@/components/CreateEditInvoice';
import { Spinner } from '@/components/Spinner';
import { Invoice, useInvoices } from '@/hooks/useInvoices';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const [invoice, setInvoice] = useState<Invoice | undefined>(undefined);
  const { getInvoiceById, allInvoices } = useInvoices();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (allInvoices.length > 0) {
      const singleInvoice = getInvoiceById(Number(params.id));
      if (!singleInvoice) router.push('/invoices');
      setInvoice(singleInvoice);
      setLoading(false);
    }
  }, [params.id, allInvoices]);
  if (loading) return <Spinner />;

  return <CreateEditInvoice invoice={invoice} />;
}
