'use client';

import data from '../../../schemas/header-megamenu.json';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { closeMobileMenu } from '@/src/redux/reducers/header';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export type HeaderNavItemType = {
  title: string;
  link: string;
};

export default function HamburgerMenu({
  children
}: {
  children: React.ReactNode;
}) {
  const isMobileMenuOpen = useAppSelector(
    (state) => state.header.isMobileMenuOpen
  );

  const dispatch = useAppDispatch();
  return (
    <>
      <div
        className={clsx(
          'fixed top-0 left-0 z-50 w-screen h-screen invisible opacity-0 bg-black bg-opacity-80 transition duration-500',
          'md:hidden',
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
          'fixed top-0 left-0 z-50 flex flex-col bg-secondary-900 w-80 -translate-x-80 h-screen',
          'k-container k-px k-py',
          'opacity-0 transition duration-500 transform',
          'md:hidden',
          {
            '!visible !opacity-100 translate-x-[0]': isMobileMenuOpen
          }
        )}
      >
        {children}
      </div>
    </>
  );
}
