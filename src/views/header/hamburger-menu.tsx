'use client';

import data from '../../schemas/header-megamenu.json';
import { Button } from '@/src/components/button';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { closeMobileMenu } from '@/src/redux/reducers/header';
import clsx from 'clsx';
import Link from 'next/link';

export type HeaderNavItemType = {
  title: string;
  link: string;
};

export default function HamburgerMenu() {
  const isMobileMenuOpen = useAppSelector(
    (state) => state.header.isMobileMenuOpen
  );

  const dispatch = useAppDispatch();
  return (
    <>
      <div
        className={clsx(
          'fixed top-0 left-0 z-50 w-screen h-screen invisible opacity-0 bg-black bg-opacity-80 transition duration-500',
          {
            '!visible !opacity-100 scroll-lock': isMobileMenuOpen
          }
        )}
        // TODO: Remove this after we have a better solution for clicking outside of the menu
        onClick={() => {
          dispatch(closeMobileMenu());
        }}
      />
      <div
        className={clsx(
          'fixed top-0 left-0 z-50 flex flex-col bg-primary-100 w-80 h-screen',
          'invisible opacity-0 transition duration-500 transform -translate-x-72',
          {
            '!visible !opacity-100 translate-x-0': isMobileMenuOpen
          }
        )}
      >
        <ul className="flex flex-col gap-3">
          {data?.map((item: HeaderNavItemType) => (
            <li key={item.title} className="text-white cursor-pointer">
              <Link href={item.link} className="hover:text-primary-100">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
