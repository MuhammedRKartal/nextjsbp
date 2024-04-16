'server-only';

import Login from '@/views/login';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

export default async function Auth({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const session = await getServerSession();
  const callback = searchParams?.callbackUrl;

  if (session?.user) {
    const callback = searchParams?.callbackUrl;

    redirect(callback ?? '/');
  }
  return <Login />;
}
