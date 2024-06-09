import { SliderMenu } from "@/components/slider-menu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeAccountPopUp, openAccountPopUp } from "@/redux/reducers/pop-ups";
import { ROUTES } from "@/routes";
import { PayloadAction } from "@reduxjs/toolkit";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function AccountPopUp() {
  const { openAccountPopUp: accountPopUpOpen } = useAppSelector(state => state.popUps);
  const dispatch = useAppDispatch();
  const { data } = useSession();
  const user = data?.user?.name;

  const onClickSignOut = () => {
    signOut();
  };

  return (
    <>
      <div
        className={twMerge(
          accountPopUpOpen ? "opacity-100 visible lg:opacity-0" : "opacity-0 invisible",
          "fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-80 transition-all duration-300"
        )}
        onClick={() => {
          dispatch(closeAccountPopUp());
        }}
      />
      <SliderMenu
        onMouseEnter={() => dispatch(openAccountPopUp())}
        onMouseLeave={() => dispatch(closeAccountPopUp())}
        closePop={closeAccountPopUp() as PayloadAction}
        open={accountPopUpOpen}
        enableDesktop={true}
        desktopWidth={"sm:w-56"}
      >
        <header className="flex items-center justify-between gap-2 pb-4 mb-3 border-b border-outline dark:border-secondaryoutline lg:pb-2 text-white-300 dark:text-black-700">
          <h3 className="text-lg lg:text-base">{`Hi, ${user}`}</h3>
        </header>
        <ul className="flex flex-col text-white-300 dark:text-black-700 gap-1 mb-3 lg:gap-1 lg:mb-2">
          <li>
            <Link href={ROUTES.ACCOUNT}>My Account</Link>
          </li>
          <li>
            <Link href={ROUTES.ORDERS}>My Orders</Link>
          </li>
        </ul>
        <footer className="text-white-300 dark:text-black-700">
          <div className="hover:cursor-pointer w-fit" onClick={onClickSignOut}>
            Sign Out
          </div>
        </footer>
      </SliderMenu>
    </>
  );
}
