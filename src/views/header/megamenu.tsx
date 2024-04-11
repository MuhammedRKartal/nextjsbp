'use client';

import { Image } from '@/components/image';
import data from '@/schemas/header-megamenu.json';
import { Button } from '@/components/button';
import MobileHamburgerButton from './mobile-menu/hamburger-menu-button';
import CustomModal from '@/views/modals/custom-modal';
import { useCallback, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons/faBasketShopping';
import { useGetBasketQuery } from '@/data/client/basket';
import MiniBasket from './mini-basket';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  closeMiniBasket,
  toggleMiniBasket
} from '@/redux/reducers/mini-basket';

export type HeaderNavItemType = {
  title: string;
  link: string;
};

export default function Megamenu() {
  const dispatch = useAppDispatch();

  const { data: miniBasketData } = useGetBasketQuery();

  const { open: miniBasketOpen } = useAppSelector((state) => state.miniBasket);

  return (
    <>
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
          link="/login"
          linkclassname=""
          className="pl-2"
        >
          <FontAwesomeIcon icon={faUser} size="lg" />
        </Button>
      </div>
    </>
  );
}
