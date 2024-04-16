import { Section } from '@/components/section';
import { AccountInfoBox } from '@/views/account/account-info-box';
import { AccountMenu } from '@/views/account/account-menu';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Account Page'
};

export default async function Page() {
  const session = await getServerSession();

  if (session?.user) {
    if (cookies().get('refresh_token')?.value) {
      redirect('/login');
    }
  } else {
    redirect('/login');
  }

  return (
    <Section className="flex gap-5 items-start">
      <AccountMenu />
      <div className="flex flex-wrap gap-3 w-full md:flex-nowrap">
        <AccountInfoBox title={'WowTasker Points'}>
          <p className="text-sm mb-8">
            Our point system is going to be awailable soon.
          </p>
          <Link href={'/account'} className="font-bold mt-auto underline">
            Continue Shopping
          </Link>
        </AccountInfoBox>
        <AccountInfoBox title={'Contact Us'}>
          <p className="text-sm mb-20">
            To share your opinion, suggesion or complaint, you can reach us via
            our RocketChat app. You can log in with the credentials of WoWTasker
            website.
          </p>
          <Link href={'/account'} className="text-xl font-bold mt-auto">
            RocketChat
          </Link>
        </AccountInfoBox>
      </div>
    </Section>
  );
}
