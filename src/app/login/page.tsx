'server-only';

import Login from '@/views/login';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { cookies } from 'next/headers';

export default async function Auth() {
  const session = await getServerSession();

  if (session?.user) {
    if (cookies().get('refresh_token')?.value) {
      redirect('/');
    }
  }
  return <Login />;
}
