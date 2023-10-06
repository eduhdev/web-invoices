import InvoicesTable from '@/components/InvoicesTable';
import { Button } from '@/components/ui/button';
import { TabsList, TabItem } from '@/components/ui/tabs';
import Link from 'next/link';

const InvoicesPage = () => {
  return (
    <>
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
      <InvoicesTable />
    </>
  );
};

export default InvoicesPage;
