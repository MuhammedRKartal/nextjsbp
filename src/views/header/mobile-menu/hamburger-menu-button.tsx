'use client';

import { Button } from '@/src/components/button';
import { toggleMobileMenu } from '@/src/redux/reducers/header';
import { useAppDispatch } from '@/src/redux/hooks';
import Image from 'next/image';

export default function MobileHamburgerButton() {
  const dispatch = useAppDispatch();

  return (
    <Button
      className="md:hidden"
      appearance="ghost"
      onClick={() => dispatch(toggleMobileMenu())}
    >
      <Image
        src={'/assets/menu.svg'}
        alt="Hamburger Menu"
        height={20}
        width={20}
      ></Image>
    </Button>
  );
}
