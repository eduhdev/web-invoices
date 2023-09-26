'use client';

import InvoiceTable from '@/components/InvoiceTable';
import { TabsList, TabItem } from '@/components/ui/tabs';
import { useState } from 'react';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('all');

  return (
    <div className='flex-1 pt-8 px-4'>
      <h1 className='text-4xl font-semibold'>Invoices List</h1>
      <div className='flex justify-end'>
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
    </div>
  );
};

export default Dashboard;
