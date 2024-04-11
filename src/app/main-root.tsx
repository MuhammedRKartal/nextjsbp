import StoreProvider from '@/components/StoreProvider';
import 'server-only';

export default function MainRoot({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
