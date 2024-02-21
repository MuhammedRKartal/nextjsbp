'use client';

import data from '../../schemas/header-megamenu.json';
import { Button } from '@/src/components/button';
import clsx from 'clsx';

export type HeaderNavItemType = {
  title: string;
  link: string;
};

export default async function HamburgerMenu() {
  return (
    <div className="md:hidden">
      <div className={clsx('fixed top-0 left-0 h-full w-5/6 bg-red-400')}>
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
