import { ROUTES } from '@/routes';
import { AccountInfoBox } from '@/views/account/account-info-box';
import { AccountMenuMobile } from '@/views/account/account-menu-mobile';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import SignOut from '@/components/SignOut';

export default async function Page() {
  const session = await getServerSession();
  const cookie = cookies();

  if (!session?.user) {
    redirect(ROUTES.LOGIN);
  }
  if (!cookie.get('refresh_token')?.value) {
    return <SignOut />;
  }

  return (
    <>
      <AccountMenuMobile className="md:hidden mb-8" />

      <div className="flex flex-wrap gap-3 w-full md:flex-nowrap">
        <AccountInfoBox title={'WowTasker Points'}>
          <p className="text-sm mb-8">
            Our point system is going to be awailable soon.
          </p>
          <Link href={ROUTES.PRODUCTS} className="font-bold mt-auto underline">
            Continue Shopping
          </Link>
        </AccountInfoBox>
        <AccountInfoBox title={'Contact Us'}>
          <p className="text-sm mb-20">
            To share your opinion, suggesion or complaint, you can reach us via
            our Discord channel.
          </p>
          <Link
            href={'https://discord.com/invite/wowtasker'}
            target="_blank"
            rel="noreferrer"
            className="text-xl font-bold mt-auto"
          >
            Discord
          </Link>
        </AccountInfoBox>
      </div>
    </>
  );
}
