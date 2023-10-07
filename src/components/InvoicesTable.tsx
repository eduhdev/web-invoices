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
import { InvoiceTableAction } from './InvoiceTableAction';

const InvoiceTable = () => {
  const { loading, filteredInvoices } = useInvoices();
  const { getClientName } = useClients();

  return (
    <Table className='mt-6'>
      <TableCaption className='mt-8 pt-4 border-t-2'>
        A list of your recent invoices.
      </TableCaption>
      <TableHeader>
        <TableRow className='max-md:text-xs'>
          <TableHead className='md:w-[100px]'>Invoice</TableHead>
          <TableHead>Client Name</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className='text-right'>Action</TableHead>
        </TableRow>
      </TableHeader>
      {loading ? (
        <TableRow>
          <TableCell colSpan={5}>
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
              <TableRow className='h-12 max-md:text-xs' key={invoice.id}>
                <TableCell className='font-medium'>INV-{invoice.id}</TableCell>
                <TableCell>{clientName}</TableCell>
                <TableCell>{formatToPrice(totalAmount)}</TableCell>
                <TableCell
                  className={`font-semibold capitalize ${
                    invoice.paid
                      ? 'text-green-600'
                      : 'text-red-700'
                  }`}
                >
                  {invoice.paid ? "Paid" : "Unpaid"}
                </TableCell>
                <TableCell className='flex justify-end pr-4'>
                  <InvoiceTableAction invoice={invoice} />
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
