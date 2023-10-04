import InvoiceTable from '@/components/InvoiceTable';
import { Button } from '@/components/ui/button';
import { TabsList, TabItem } from '@/components/ui/tabs';
import { InvoicesProvider } from '@/hooks/useInvoices';
import Link from 'next/link';

const Dashboard = () => {
  return (
    <InvoicesProvider>
      <h1 className='text-4xl font-semibold'>Invoices List</h1>
      <div className='flex justify-between mt-4'>
        <Link href='/dashboard/invoices/create'>
          <Button>Create New</Button>
        </Link>
        <TabsList>
          <TabItem value='all' />
          <TabItem value='paid' />
          <TabItem value='unpaid' />
        </TabsList>
      </div>
      <InvoiceTable />
    </InvoicesProvider>
  );
};

export default Dashboard;
