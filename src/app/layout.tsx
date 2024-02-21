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
  title: 'Create Next App',
  description: 'Generated by create next app'
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
