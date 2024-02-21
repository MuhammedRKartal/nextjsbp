'server-only';

import clsx from 'clsx';
import Megamenu from './megamenu';
import Navbar from './navbar';
import HamburgerMenu from './hamburger-menu';

export default function Header() {
  return (
    <>
      <header className={clsx('w-full sticky h-full top-0 z-10', 'md:top-4')}>
        <div
          className={clsx(
            'h-[50px] px-2',
            'border-0 bg-primary-opacity',
            'md:h-[72px] md:mx-8 md:px-4 md:rounded-lg'
          )}
        >
          <Navbar>
            <Megamenu />
          </Navbar>
          <HamburgerMenu />
        </div>
      </header>
    </>
  );
}
