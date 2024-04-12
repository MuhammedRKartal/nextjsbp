import { Button } from '@/components/button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeAccountPopUp, openAccountPopUp } from '@/redux/reducers/pop-ups';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { signOut, useSession } from 'next-auth/react';

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
      <div
        onMouseEnter={() => dispatch(openAccountPopUp())}
        onMouseLeave={() => dispatch(closeAccountPopUp())}
        className={clsx(
          accountPopUpOpen
            ? 'flex flex-col opacity-100 visible lg:translate-y-[calc(100%)] '
            : 'opacity-0 invisible translate-x-full lg:translate-x-0 lg:translate-y-[calc(100%+16px)]',
          'fixed bottom-0 right-0 h-screen lg:h-auto bg-secondary-black text-white z-50 transition-all duration-300 p-5 w-full',
          'sm:w-56',
          'lg:absolute lg:right-8 lg:-bottom-1 lg:border lg:border-secondary-darkest lg:rounded'
        )}
      >
        <header className="flex items-center justify-between gap-2 pb-4 border-b lg:pb-2 lg:mb-3 text-gray-300">
          <h3 className="text-xs lg:text-sm">{`Hi, ${user}`}</h3>
          <FontAwesomeIcon
            onClick={() => {
              dispatch(closeAccountPopUp());
            }}
            className="transition-all duration-300 text-lg hover:text-white hover:cursor-pointer lg:!hidden"
            icon={faClose}
          ></FontAwesomeIcon>
        </header>
        <ul className="text-xs lg:text-sm text-gray-300 mb-3">
          <li>My Account</li>
        </ul>
        <footer className="text-xs lg:text-sm text-gray-300">
          <div className="hover:cursor-pointer w-fit" onClick={onClickSignOut}>
            Sign Out
          </div>
        </footer>
      </div>
    </>
  );
}
