'use client';

import clsx from 'clsx';
import { Button } from '@/components/button';
import Footer from '@/views/footer';
import Header from '@/views/header';
import { Section } from '@/components/section';
import { Image } from '@/components/image';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="preload overflow-x-hidden bg-black">
        <Header />
        <main>
          <Section
            className={clsx('relative mx-auto my-10', 'md:my-20')}
            tag="div"
            appearance="thin"
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
                aspectRatio={1}
              ></Image>
              <h1 className="text-2xl text-white">Something went wrong!</h1>
              <span className="text-lg text-white capitalize">
                {error.message}
              </span>
              <Button appearance="filled" link="/">
                Return Home
              </Button>
            </div>
          </Section>
        </main>
        <Footer />
      </body>
    </html>
  );
}
