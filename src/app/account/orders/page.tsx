'use client';

import { Section } from '@/components/section';
import { AccountMenu } from '@/views/account/account-menu';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === 'unauthenticated') {
    router.push('/login');
  }

  return (
    <Section className="flex gap-5 items-start">
      <AccountMenu />
      <div className="w-full text-white">
        <h3 className="text-3xl mb-4">Change Password</h3>
        <div className="flex flex-col gap-7 xl:flex-row xl:w-full xl:flex-wrap">
          <div className="flex-[60]">
            <div className="flex flex-col gap-5 px-7 py-6 border  xl:px-24 xl:py-16">
              <form className="flex flex-col gap-5">
                <Button
                  type="submit"
                  appearance="filled"
                  size="xs"
                  className="w-full text-base"
                >
                  Change Password
                </Button>
              </form>
            </div>
          </div>
          <div className="flex flex-[40] flex-col gap-4">
            <h3 className="text-3xl">Do you have any questions?</h3>
            <div className="text-sm">
              Check out our{' '}
              <Link href={'/account/faq'} className="underline">
                FAQ
              </Link>{' '}
              page.
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
