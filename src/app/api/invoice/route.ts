import { invoicesMock } from '@/lib/mocks';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const filter = url.searchParams.get('filter');

  let invoices = []

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if(filter === 'all') return NextResponse.json(invoicesMock);

  invoices = invoicesMock.filter(invoice => invoice.status === filter)
  return NextResponse.json(invoices);
}
