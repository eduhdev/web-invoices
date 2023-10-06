"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Invoice, InvoiceStatus, useInvoices } from '@/hooks/useInvoices';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';

export function InvoiceTableAction({ invoice }: {invoice: Invoice}) {
  const { handlePaidStatus } = useInvoices()
  return (
    <div className=' cursor-pointer'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <Link href={`/invoices/${invoice.id}`}>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => handlePaidStatus(invoice)}>
            Mark as {invoice.paid ? 'Unpaid' : 'Paid'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
