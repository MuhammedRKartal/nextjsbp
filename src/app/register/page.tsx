'server-only';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import Register from '@/views/register';

export default async function Auth() {
  const session = await getServerSession();

  if (session?.user) {
    redirect('/');
  }

  return <Register />;
}
