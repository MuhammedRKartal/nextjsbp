'server-only';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { cookies } from 'next/headers';
import Register from '@/views/register';

export default async function Auth() {
  const session = await getServerSession();

  if (session?.user) {
    if (cookies().get('refresh_token')?.value) {
      redirect('/');
    }
  }

  return <Register />;
}
