'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes';
import { AccountOrders } from '@/views/account/orders';

export default function OrdersPage() {
  const { status } = useSession();
  const router = useRouter();
  if (status === 'unauthenticated') {
    router.push(ROUTES.LOGIN);
  }

  return <AccountOrders />;
}
