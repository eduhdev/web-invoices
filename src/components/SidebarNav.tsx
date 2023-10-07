'use client';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { useApp } from '@/hooks/useApp';
import { MenuIcon, X } from 'lucide-react';

const SidebarNav = () => {
  const { data: session } = useSession();
  const { openMobMenu, handleMobMenu } = useApp();

  return (
    <>
      <div className='md:hidden w-full bg-primary text-white p-2'>
        <MenuIcon size={30} onClick={handleMobMenu} />
      </div>
      <div
        className={`fixed md:relative text-white transition-transform duration-500 z-10 flex w-full md:max-w-[15rem] bg-primary min-h-screen py-8 px-4 flex-col items-center ${
          openMobMenu ? '' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <X
          className='absolute top-4 right-4 md:hidden'
          size={30}
          onClick={handleMobMenu}
        />
        <Avatar className='h-20 w-20 mb-8'>
          <AvatarImage src={session?.user?.image || ''} />
          <AvatarFallback>
            {session?.user?.name?.substring(0, 3)}
          </AvatarFallback>
        </Avatar>
        <Separator className='opacity-50' />
        <div className='text-lg space-y-2 mt-8 flex flex-col text-center'>
          <Link href='/invoices' onClick={handleMobMenu}>Invoices</Link>
          <Link href='/clients' onClick={handleMobMenu}>Clients</Link>
        </div>
        <Button
          className='mt-auto w-full'
          variant='secondary'
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </div>
    </>
  );
};

export default SidebarNav;
