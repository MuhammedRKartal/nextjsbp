'use client';

import { Section } from '@/components/section';
import { AccountMenu } from '@/views/account/account-menu';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';
import { useGetOrdersQuery } from '@/data/client/account';
import { ROUTES } from '@/routes';

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === 'unauthenticated') {
    router.push(ROUTES.LOGIN);
  }

  const { data } = useGetOrdersQuery();

  return (
    <Section className="flex gap-5 items-start">
      <AccountMenu />
    </Section>
  );
}
