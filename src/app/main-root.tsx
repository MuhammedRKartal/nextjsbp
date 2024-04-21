'use server';

import StoreProvider from '@/components/StoreProvider';

export default async function MainRoot({
  children
}: {
  children: React.ReactNode;
}) {
  return <StoreProvider>{children}</StoreProvider>;
}
