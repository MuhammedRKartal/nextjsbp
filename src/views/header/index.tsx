'use client';
import clsx from 'clsx';
import Megamenu from './megamenu';
import Navbar from './navbar';

export default function Header() {
  return (
    <>
      <header className={clsx('w-full sticky top-0 z-10', 'md:top-4')}>
        <Navbar>
          <Megamenu />
        </Navbar>
      </header>
    </>
  );
}
