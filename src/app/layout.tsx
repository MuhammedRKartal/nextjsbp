import type { Metadata } from 'next';
import '@/app/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { Lato } from 'next/font/google';
import ClientRoot from '@/app/client-root';
import MainRoot from './main-root';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/SessionProvider';
import ThemeProvider from '@/components/ThemeProvider';

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'WoW Tasker',
  description: 'Revolutionize your botting experience with WoW Tasker!',
  metadataBase: new URL(process.env.NEXTAUTH_URL),
  verification: {
    google: '5cQd3-U9FV3CZh0ax9nuPPUNR2DUo-JVHku4r2vUQ_0'
  },
  openGraph: {
    title: 'WoW Tasker',
    description: 'Revolutionize your botting experience with WoW Tasker!',
    url: process.env.NEXTAUTH_URL,
    type: 'website',
    siteName: 'WoW Tasker',
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
      <body className="preload overflow-x-hidden bg-black dark:bg-white text-white dark:text-black w-full">
        <MainRoot>
          <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ClientRoot>{children}</ClientRoot>
            </ThemeProvider>
          </SessionProvider>
        </MainRoot>
      </body>
    </html>
  );
}
