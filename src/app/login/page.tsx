'server-only';

import Login from '@/views/login';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

export default async function Auth() {
  const session = await getServerSession();

  if (session?.user) {
    redirect('/');
  }
  return <Login />;
}
