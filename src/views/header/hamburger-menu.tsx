'use client';

import data from '../../schemas/header-megamenu.json';
import { Button } from '@/src/components/button';
import { useAppSelector } from '@/src/redux/hooks';
import clsx from 'clsx';

export type HeaderNavItemType = {
  title: string;
  link: string;
};

export default function HamburgerMenu() {
  const isMenuOpen = useAppSelector((state) => state.header.isMobileMenuOpen);
  return (
    <div className="md:hidden">
      <div
        className={clsx(
          'fixed top-0 left-0 h-full w-5/6 bg-red-400',
          isMenuOpen ? '' : 'hidden'
        )}
      >
        {data?.map((item: HeaderNavItemType) => (
          <Button
            key={item.title}
            linkclassname="hidden md:block"
            className="h-8 text-white"
            appearance="bright"
            link={item.link}
          >
            {item.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
