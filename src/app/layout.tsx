import 'server-only';

import type { Metadata } from 'next';
import '@/app/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { Lato } from 'next/font/google';
import Header from '@/views/header';
import Footer from '@/views/footer';
import ClientRoot from '@/app/client-root';
import clsx from 'clsx';
import MainRoot from './main-root';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/SessionProvider';

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Next BPK',
  description: 'Nextjs Template Website by Muhammed Kartal',
  metadataBase: new URL(process.env.NEXTAUTH_URL),
  verification: {
    google: '5cQd3-U9FV3CZh0ax9nuPPUNR2DUo-JVHku4r2vUQ_0'
  },
  openGraph: {
    title: 'Next BPK',
    description: 'Nextjs Template Website by Muhammed Kartal',
    url: process.env.NEXTAUTH_URL,
    type: 'website',
    siteName: 'Next BPK',
    images: [
      {
        url: '/assets/WoWTaskerMinimized.png',
        width: 400,
        height: 400
      }
    ]
  }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className={lato.className}>
      <body className="preload overflow-x-hidden bg-black">
        <MainRoot>
          <SessionProvider session={session}>
            <ClientRoot>{children}</ClientRoot>
          </SessionProvider>
        </MainRoot>
      </body>
    </html>
  );
}
