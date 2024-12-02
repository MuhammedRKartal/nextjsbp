"use client";

import { faBasketShopping } from "@fortawesome/free-solid-svg-icons/faBasketShopping";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons/faLightbulb";
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { Image } from "@/components/image";
import { useAppDispatch } from "@/redux/hooks";
import { closeAccountPopUp, openAccountPopUp, toggleMiniBasket } from "@/redux/reducers/pop-ups";
import { ROUTES } from "@/routes";
import data from "@/schemas/header-megamenu.json";
import AccountPopUp from "./account-popup";
import MiniBasket from "./mini-basket";
import MobileHamburgerButton from "./mobile-menu/hamburger-menu-button";

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

  const isActive = theme === "light";

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const onClickEvent = () => {
    if (status === "authenticated") {
      dispatch(openAccountPopUp());
    } else {
      router.push(ROUTES.LOGIN);
    }
  };

  const onHoverEvent = () => {
    if (status === "authenticated") {
      dispatch(openAccountPopUp());
    }
  };

  const onHoverOutEvent = () => {
    if (status === "authenticated") {
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
            src={"/assets/company-logo-minimized.png"}
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
            className="h-8"
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
          className="px-2 md:text-lg"
          appearance="bright"
          onClick={() => {
            dispatch(toggleMiniBasket());
          }}
        >
          <FontAwesomeIcon icon={faBasketShopping} />
        </Button>
        <Button
          appearance="bright"
          linkclassname=""
          className="px-2 md:text-lg z-[60]"
          onClick={onClickEvent}
          onMouseEnter={onHoverEvent}
          onMouseLeave={onHoverOutEvent}
        >
          <FontAwesomeIcon icon={faUser} />
        </Button>
        <Button
          onClick={toggleTheme}
          appearance="bright"
          className="pl-2 pr-2 mr-2 md:w-8 hover:text-outline-600"
        >
          {isActive ? <FontAwesomeIcon icon={faLightbulb} /> : <FontAwesomeIcon icon={faMoon} />}
        </Button>
      </div>
    </>
  );
}
