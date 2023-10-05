'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatToPrice } from '@/lib/utils';
import { Spinner } from './Spinner';
import { useInvoices } from '@/hooks/useInvoices';
import { useClients } from '@/hooks/useClients';

const InvoiceTable = () => {
  const { loading, filteredInvoices } = useInvoices();
  const { getClientName } = useClients();

  return (
    <Table className='mt-6'>
      <TableCaption className='mt-8 pt-4 border-t-2'>
        A list of your recent invoices.
      </TableCaption>
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
          {filteredInvoices.map((invoice) => {
            const clientName = getClientName(invoice.clientId);
            const totalAmount = invoice.items.reduce(
              (acc, item) => acc + item.amount,
              0
            );
            return (
              <TableRow className='h-12' key={invoice.id}>
                <TableCell className='font-medium'>INV-{invoice.id}</TableCell>
                <TableCell>{clientName}</TableCell>
                <TableCell>{formatToPrice(totalAmount)}</TableCell>
                <TableCell
                  className={`text-right font-semibold capitalize ${
                    invoice.status === 'paid'
                      ? 'text-green-600'
                      : 'text-red-700'
                  }`}
                >
                  {invoice.status}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      )}
    </Table>
  );
};

export default InvoiceTable;
