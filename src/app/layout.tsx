import 'server-only';
import type { Metadata } from 'next';
import './globals.css';

import { Lato } from 'next/font/google';
import Header from '../views/header';
import Footer from '../views/footer';
import ClientRoot from './client-root';
import clsx from 'clsx';

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Next BPK',
  description: 'Nextjs Template Website by Muhammed Kartal',
  metadataBase: new URL('https://nextbpk.netlify.app'),
  openGraph: {
    title: 'Next BPK',
    description: 'Nextjs Template Website by Muhammed Kartal',
    url: 'https://nextbpk.netlify.app',
    type: 'website',
    siteName: 'Next BPK',
    images: [
      {
        url: 'https://wowtasker.io/wp-content/uploads/2024/02/logo-banner.png',
        width: 400,
        height: 400
      }
    ]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lato.className}>
      <body className="preload overflow-x-hidden bg-black-400">
        <ClientRoot>
          <Header />
          <main
            className={clsx(
              'relative container mx-auto px-6 my-10',
              'md:px-0 md:my-20'
            )}
          >
            {children}
          </main>
          <Footer />
        </ClientRoot>
      </body>
    </html>
  );
}
