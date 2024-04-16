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
        <header className="flex items-center justify-between gap-2 pb-4 mb-3 border-b lg:pb-2 text-gray-300">
          <h3 className="text-xs lg:text-sm">{`Hi, ${user}`}</h3>
        </header>
        <ul className="text-xs lg:text-sm text-gray-300 mb-3">
          <li>
            <Link href={ROUTES.ACCOUNT}>My Account</Link>
          </li>
        </ul>
        <footer className="text-xs lg:text-sm text-gray-300">
          <div className="hover:cursor-pointer w-fit" onClick={onClickSignOut}>
            Sign Out
          </div>
        </footer>
      </SliderMenu>
    </>
  );
}
