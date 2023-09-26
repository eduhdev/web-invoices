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

const Dashboard = () => {
  return (
    <div className='flex-1 pt-8 px-4'>
      <h1 className='text-4xl font-semibold'>Invoices List</h1>
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
          {invoicesMock.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className='font-medium'>INV-{invoice.id}</TableCell>
              <TableCell>{invoice.client_name}</TableCell>
              <TableCell>{formatToPrice(invoice.total_amount)}</TableCell>
              <TableCell className={`text-right ${invoice.status === "Paid" ? "text-green-600" : "text-red-700"}`}>{invoice.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;
