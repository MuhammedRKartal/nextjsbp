'use client';

import { Section } from '@/components/section';
import { AccountMenu } from '@/views/account/account-menu';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';
import { ROUTES } from '@/routes';
import { AccountOrders } from '@/views/account/orders';

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === 'unauthenticated') {
    router.push(ROUTES.LOGIN);
  }

  return (
    <Section className="flex gap-5 items-start">
      <AccountMenu />
      <AccountOrders />
    </Section>
  );
}
