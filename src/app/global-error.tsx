'use client';

import clsx from 'clsx';
import { Button } from '../components/button';
import Footer from '../views/footer';
import Header from '../views/header';
import Image from 'next/image';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="preload overflow-x-hidden bg-black-400">
        <Header />
        <main
          className={clsx(
            'relative container mx-auto px-6 my-10',
            'md:px-0 md:my-20'
          )}
        >
          <div
            className={clsx(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              'flex flex-col items-center justify-center gap-4 w-full'
            )}
          >
            <Image
              src={'/assets/wowl.png'}
              alt="Company Logo"
              height={70}
              width={70}
            ></Image>
            <h1 className="text-2xl text-white">Something went wrong!</h1>
            <span className="text-lg text-white capitalize">
              {error.message}
            </span>
            <Button appearance="filled" link="/">
              Return Home
            </Button>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
