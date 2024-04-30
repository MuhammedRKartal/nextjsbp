import { twMerge } from 'tailwind-merge';
import { SliderMenuProps } from './types';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { useDispatch } from 'react-redux';

export const SliderMenu = (props: SliderMenuProps) => {
  const {
    open,
    closePop,
    enableDesktop,
    desktopWidth,
    className,
    children,
    ...rest
  } = props;

  const dispatch = useDispatch();
  return (
    <div
      {...rest}
      className={twMerge(
        clsx(
          open
            ? 'flex flex-col opacity-100 visible scroll-lock'
            : 'opacity-0 invisible translate-x-full',
          'fixed bottom-0 right-0 h-full bg-black dark:bg-white-bg z-[70] transition-all duration-300 p-5 w-full',
          enableDesktop &&
            clsx(
              open
                ? 'lg:scroll-visible lg:translate-y-[calc(100%)]'
                : 'lg:translate-x-0 lg:translate-y-[calc(100%+16px)]',
              'lg:h-auto lg:absolute lg:right-8 lg:-bottom-1 lg:border lg:border-outline dark:border-secondaryoutline dark:lg:border-secondaryoutline-100 lg:rounded',
              `${desktopWidth}`
            )
        ),
        className
      )}
    >
      <>
        <FontAwesomeIcon
          onClick={() => {
            dispatch(closePop);
          }}
          className="absolute right-5 transition-all duration-300 text-lg hover: hover:cursor-pointer lg:!hidden"
          icon={faClose}
        ></FontAwesomeIcon>
        {children}
      </>
    </div>
  );
};
