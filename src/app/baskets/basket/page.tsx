'use client';

import { redirect } from 'next/navigation';
import Basket from '@/views/basket';
import { useSession } from 'next-auth/react';

export default function BasketPage() {
  const session = useSession();

  if (session?.status === 'unauthenticated') {
    redirect('/login');
  }
  return <Basket />;
}
