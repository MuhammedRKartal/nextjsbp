'use client';
import clsx from 'clsx';
import ReactPortal from './react-portal';
import { Button } from './button';

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
  if (!open) {
    document.querySelector('#main')?.classList.remove('blur-sm');
    document.querySelector('#header')?.classList.remove('blur-sm');
    document.querySelector('#footer')?.classList.remove('blur-sm');
    return null;
  } else {
    document.querySelector('#main')?.classList.add('blur-sm');
    document.querySelector('#header')?.classList.add('blur-sm');
    document.querySelector('#footer')?.classList.add('blur-sm');
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
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-secondary-100 shadow-lg',
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
                X
              </Button>
            )}
          </div>
        )}
        {children}
      </section>
    </ReactPortal>
  );
};
