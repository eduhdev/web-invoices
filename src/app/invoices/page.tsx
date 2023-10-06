import Link from 'next/link';
import InvoicesTable from '@/components/InvoicesTable';
import { Button } from '@/components/ui/button';
import { TabsList, TabItem } from '@/components/ui/tabs';

export default function InvoicesPage() {
  return (
    <>
      <h1 className='text-4xl font-semibold'>Invoices List</h1>
      <div className='flex justify-between mt-4'>
        <Link href='/invoices/create'>
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
