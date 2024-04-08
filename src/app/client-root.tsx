'server-only';

import StoreProvider from '@/app/StoreProvider';
import { SessionProvider } from 'next-auth/react';

export default function ClientRoot({
  children
}: {
  children: React.ReactNode;
}) {
  return <StoreProvider>{children}</StoreProvider>;
}
