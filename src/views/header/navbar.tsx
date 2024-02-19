'use client';

import { clsx } from 'clsx';

export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav
        className={clsx(
          'h-[50px] flex items-center justify-center gap-2 transition-all px-2',
          'border-0 bg-green-opa',
          'md:h-[72px] md:mx-8 md:px-4 md:rounded-lg md:justify-start'
        )}
      >
        {children}
      </nav>
    </>
  );
}
