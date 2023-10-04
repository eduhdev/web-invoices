'use client';

import InvoiceTable from '@/components/InvoiceTable';
import { Button } from '@/components/ui/button';
import { TabsList, TabItem } from '@/components/ui/tabs';
import Link from 'next/link';
import { useState } from 'react';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState<'all' | 'paid' | 'unpaid'>(
    'all'
  );

  return (
    <>
      <h1 className='text-4xl font-semibold'>Invoices List</h1>
      <div className='flex justify-between mt-4'>
        <Link href='/dashboard/invoices/create'>
          <Button>Create New</Button>
        </Link>
        <TabsList>
          <TabItem
            active={currentTab === 'all'}
            handleChange={() => setCurrentTab('all')}
            title='All'
          />
          <TabItem
            active={currentTab === 'paid'}
            handleChange={() => setCurrentTab('paid')}
            title='Paid'
          />
          <TabItem
            active={currentTab === 'unpaid'}
            handleChange={() => setCurrentTab('unpaid')}
            title='Unpaid'
          />
        </TabsList>
      </div>
      <InvoiceTable filter={currentTab} />
    </>
  );
};

export default Dashboard;
