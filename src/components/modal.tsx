'use client';

import clsx from 'clsx';
import ReactPortal from './react-portal';
import { Button } from './button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';

export interface ModalProps {
  children: React.ReactNode;
  wrapperId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: React.ReactNode;
  showCloseButton?: React.ReactNode;
  className?: string;
}

export const Modal = (props: ModalProps) => {
  const {
    children,
    wrapperId,
    open,
    setOpen,
    showCloseButton = true,
    className
  } = props;

  function blurBackground() {
    if (typeof document !== 'undefined') {
      document.querySelector('#main')?.classList.remove('blur-sm');
      document.querySelector('#header')?.classList.remove('blur-sm');
      document.querySelector('#footer')?.classList.remove('blur-sm');
    }
  }

  function removeBlur() {
    if (typeof document !== 'undefined') {
      document.querySelector('#main')?.classList.add('blur-sm');
      document.querySelector('#header')?.classList.add('blur-sm');
      document.querySelector('#footer')?.classList.add('blur-sm');
    }
  }

  if (!open) {
    blurBackground();
    return null;
  } else {
    removeBlur();
  }

  return (
    <ReactPortal wrapperId={wrapperId}>
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-50"
        onClick={() => {
          setOpen(false);
        }}
      />
      <section
        className={clsx(
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-secondary-900 shadow-lg',
          'rounded-md',
          className
        )}
      >
        {showCloseButton && (
          <div className="absolute right-0">
            {showCloseButton && (
              <Button
                onClick={() => setOpen(false)}
                appearance="bright"
                size="xs"
              >
                <FontAwesomeIcon icon={faClose} />
              </Button>
            )}
          </div>
        )}
        {children}
      </section>
    </ReactPortal>
  );
};
