import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Account Page'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
