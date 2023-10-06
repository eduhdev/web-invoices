'use client';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';

const SidebarNav = () => {
  const { data: session } = useSession();

  return (
    <div className='hidden md:flex w-full max-w-[15rem] bg-primary min-h-screen py-8 px-4 flex-col items-center'>
      <Avatar className='h-20 w-20 mb-8'>
        <AvatarImage src={session?.user?.image || ''} />
        <AvatarFallback>{session?.user?.name?.substring(0, 3)}</AvatarFallback>
      </Avatar>
      <Separator className='opacity-50' />
      <div className='text-white text-lg space-y-2 mt-8 flex flex-col text-center'>
        <Link href='/invoices'>Invoices</Link>
        <Link href='/clients'>Clients</Link>
      </div>
      <Button className='mt-auto w-full' variant='secondary' onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  );
};

export default SidebarNav;
