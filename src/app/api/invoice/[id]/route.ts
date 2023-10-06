import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const res = await req.json();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json({ ...res, paid: !res.paid });
}
