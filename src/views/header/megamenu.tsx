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
import { ROUTES } from '@/routes';
import { useTheme } from 'next-themes';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';

export type HeaderNavItemType = {
  title: string;
  link: string;
  rel?: string | null;
  target?: string | null;
};

export default function Megamenu() {
  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();
  const { status } = useSession();
  const router = useRouter();

  const isActive = theme === 'light';

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const onClickEvent = () => {
    if (status === 'authenticated') {
      dispatch(openAccountPopUp());
    } else {
      router.push(ROUTES.LOGIN);
    }
  };

  const onHoverEvent = () => {
    if (status === 'authenticated') {
      dispatch(openAccountPopUp());
    }
  };

  const onHoverOutEvent = () => {
    if (status === 'authenticated') {
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
            src={'/assets/WoWTaskerMinimized.png'}
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
            rel={item.rel}
            target={item.target}
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
          className="px-2"
          onClick={onClickEvent}
          onMouseEnter={onHoverEvent}
          onMouseLeave={onHoverOutEvent}
        >
          <FontAwesomeIcon icon={faUser} size="lg" />
        </Button>
        <Button
          onClick={toggleTheme}
          appearance="bright"
          className="w-8 hover:text-borders-600"
        >
          {isActive ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          )}
        </Button>
      </div>
    </>
  );
}
