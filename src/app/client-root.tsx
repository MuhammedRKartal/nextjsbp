'server-only';

import StoreProvider from './StoreProvider';

export default function ClientRoot({
  children
}: {
  children: React.ReactNode;
}) {
  return <StoreProvider>{children}</StoreProvider>;
}
