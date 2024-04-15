'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeMobileMenu } from '@/redux/reducers/header';
import clsx from 'clsx';

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
          'fixed top-0 left-0 z-50 w-screen h-screen invisible opacity-0 bg-black bg-opacity-80 transition-all duration-300',
          'md:hidden',
          {
            '!visible !opacity-100 scroll-lock': isMobileMenuOpen
          }
        )}
        onClick={() => {
          dispatch(closeMobileMenu());
        }}
      />
      <div
        className={clsx(
          'fixed top-0 left-0 z-50 flex flex-col bg-secondary-black w-80 -translate-x-80 h-screen',
          'k-container k-px k-py',
          'opacity-0 transition duration-300 transform',
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
