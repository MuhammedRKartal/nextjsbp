'use server';

import clsx from 'clsx';
import Megamenu from '@/views/header/megamenu';
import Navbar from '@/views/header/navbar';
import HamburgerMenu from '@/views/header/mobile-menu/hamburger-menu';
import HamburgerMenuContent from '@/views/header/mobile-menu/hamburger-menu-content';

export default async function Header() {
  return (
    <>
      <header
        id="header"
        className={clsx('w-full sticky h-full top-0 z-50', 'md:top-4')}
      >
        <div
          className={clsx(
            'h-[50px] px-2',
            'border-0 bg-primary-600',
            'md:h-[72px] md:mx-8 md:px-4 md:rounded-lg md:bg-primary-opacity'
          )}
        >
          <Navbar>
            <Megamenu />
          </Navbar>
          <div className="transition duration-500">
            <HamburgerMenu>
              <HamburgerMenuContent />
            </HamburgerMenu>
          </div>
        </div>
      </header>
    </>
  );
}
