'use client';

import { URLS } from '@/data/urls';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();
  signOut();
  router.push(URLS.user.login);
  return <></>;
}
