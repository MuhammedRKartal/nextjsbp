import Checkout from '@/views/checkout';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function CheckoutPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const session = await getServerSession();
  console.log(session);

  if (!session?.user?.name) {
    const callback = searchParams?.callbackUrl;

    redirect(callback ?? '/');
  }
  return <Checkout />;
}
