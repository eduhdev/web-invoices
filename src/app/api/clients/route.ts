import { clientsMock } from '@/lib/mocks';
import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json(clientsMock);
}

export async function POST(req: Request) {
  const res = await req.json();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json(res);
}
