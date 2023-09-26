import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { invoicesMock } from '@/lib/mocks';
import { formatToPrice } from '@/lib/utils';
import { useEffect, useState } from 'react';

const InvoiceTable = ({ filter }: { filter: string }) => {
  const [invoices, setInvoices] = useState(invoicesMock);

  useEffect(() => {
    if (filter === 'all') {
      setInvoices(invoicesMock);
    } else if (filter === 'paid') {
      const filterByPaid = invoicesMock.filter(
        (invoice) => invoice.status === 'paid'
      );
      setInvoices(filterByPaid);
    } else {
      const filterByUnpaid = invoicesMock.filter(
        (invoice) => invoice.status === 'unpaid'
      );
      setInvoices(filterByUnpaid);
    }
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
    </Table>
  );
};

export default InvoiceTable;
