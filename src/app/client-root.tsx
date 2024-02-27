'server-only';

import StoreProvider from '@/app/StoreProvider';

export default function ClientRoot({
  children
}: {
  children: React.ReactNode;
}) {
  return <StoreProvider>{children}</StoreProvider>;
}
