import { Button } from '@/components/button';
import { SliderMenu } from '@/components/slider-menu';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeAccountPopUp, openAccountPopUp } from '@/redux/reducers/pop-ups';
import { ROUTES } from '@/routes';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PayloadAction } from '@reduxjs/toolkit';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AccountPopUp() {
  const { openAccountPopUp: accountPopUpOpen } = useAppSelector(
    (state) => state.popUps
  );
  const dispatch = useAppDispatch();
  const { data, status } = useSession();
  const user = data?.user?.name;

  const onClickSignOut = () => {
    signOut();
  };

  return (
    <>
      <SliderMenu
        onMouseEnter={() => dispatch(openAccountPopUp())}
        onMouseLeave={() => dispatch(closeAccountPopUp())}
        closePop={closeAccountPopUp() as PayloadAction}
        open={accountPopUpOpen}
        enableDesktop={true}
        desktopWidth={'sm:w-56'}
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
