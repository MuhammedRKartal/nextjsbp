'use client';

import { redirect } from 'next/navigation';
import Basket from '@/views/basket';
import { useSession } from 'next-auth/react';
import { ROUTES } from '@/routes';

export default function BasketPage() {
  const session = useSession();

  if (session?.status === 'unauthenticated') {
    redirect(ROUTES.LOGIN);
  }
  return <Basket />;
}
