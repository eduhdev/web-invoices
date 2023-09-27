import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getInvoices } from '@/hooks/invoices';
import { formatToPrice } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Spinner } from './Spinner';

type Invoice = {
  id: number;
  client_name: string;
  total_amount: number;
  status: 'all' | 'paid' | 'unpaid';
};

const InvoiceTable = ({ filter }: { filter: 'all' | 'paid' | 'unpaid' }) => {
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const fetchInvoices = async () => {
    setLoading(true);
    const allInvoices = await getInvoices(filter);
    setInvoices(allInvoices);
    setLoading(false);
  };

  useEffect(() => {
    fetchInvoices();
  }, [filter]);

  return (
    <Table className='mt-6'>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Invoice</TableHead>
          <TableHead>Client Name</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead className='text-right'>Status</TableHead>
        </TableRow>
      </TableHeader>
      {loading ? (
        <TableRow>
          <TableCell colSpan={4}>
            <Spinner />
          </TableCell>
        </TableRow>
      ) : (
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className='font-medium'>INV-{invoice.id}</TableCell>
              <TableCell>{invoice.client_name}</TableCell>
              <TableCell>{formatToPrice(invoice.total_amount)}</TableCell>
              <TableCell
                className={`text-right capitalize ${
                  invoice.status === 'paid' ? 'text-green-600' : 'text-red-700'
                }`}
              >
                {invoice.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
};

export default InvoiceTable;
