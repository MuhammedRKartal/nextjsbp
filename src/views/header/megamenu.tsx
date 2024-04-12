'use client';

import { Image } from '@/components/image';
import data from '@/schemas/header-megamenu.json';
import { Button } from '@/components/button';
import MobileHamburgerButton from './mobile-menu/hamburger-menu-button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons/faBasketShopping';
import MiniBasket from './mini-basket';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleMiniBasket } from '@/redux/reducers/pop-ups';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AccountPopUp from './account-popup';
import { closeAccountPopUp, openAccountPopUp } from '@/redux/reducers/pop-ups';
import { useState } from 'react';

export type HeaderNavItemType = {
  title: string;
  link: string;
};

export default function Megamenu() {
  const dispatch = useAppDispatch();
  const session = useSession();
  const router = useRouter();

  const onClickEvent = () => {
    if (session?.data?.user) {
      dispatch(openAccountPopUp());
    } else {
      router.push('/login');
    }
  };

  const onHoverEvent = () => {
    if (session?.data?.user) {
      dispatch(openAccountPopUp());
    }
  };

  const onHoverOutEvent = () => {
    if (session?.data?.user) {
      dispatch(closeAccountPopUp());
    }
  };

  return (
    <>
      <AccountPopUp />
      <MiniBasket />
      <MobileHamburgerButton />
      <div className="flex">
        <Button
          appearance="bright"
          link="/"
          linkclassname="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0"
        >
          <Image
            src={'/assets/wowl.png'}
            alt="wow"
            height={30}
            width={30}
            aspectRatio={1}
          ></Image>
        </Button>

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

      <div className="flex">
        <Button
          className="px-2"
          appearance="bright"
          onClick={() => {
            dispatch(toggleMiniBasket());
          }}
        >
          <FontAwesomeIcon icon={faBasketShopping} size="lg" />
        </Button>
        <Button
          appearance="bright"
          linkclassname=""
          className="pl-2 pr-2 mr-2"
          onClick={onClickEvent}
          onMouseEnter={onHoverEvent}
          onMouseLeave={onHoverOutEvent}
        >
          <FontAwesomeIcon icon={faUser} size="lg" />
        </Button>
      </div>
    </>
  );
}
