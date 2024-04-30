'use client';

import clsx from 'clsx';
import ReactPortal from '@/components/Modal/react-portal';
import { Button } from '@/components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { useEffect, useState } from 'react';
import { blurBackground, removeBlur } from '@/utils';

export interface ModalProps {
  children: React.ReactNode;
  wrapperId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: React.ReactNode;
  showCloseButton?: React.ReactNode;
  className?: string;
  outsideClick?: boolean;
  onClose?: () => void;
  data?: any;
}

export const Modal = (props: ModalProps) => {
  const {
    children,
    wrapperId,
    open,
    setOpen,
    showCloseButton = true,
    className,
    outsideClick = true,
    onClose = () => {}
  } = props;

  if (open) {
    blurBackground();
  } else {
    removeBlur();
    return null;
  }

  const closeAction = () => {
    removeBlur();
    onClose();
    setOpen(false);
  };

  return (
    <ReactPortal wrapperId={wrapperId}>
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-50"
        onClick={() => {
          if (outsideClick) closeAction();
        }}
      />
      <section
        className={clsx(
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-primary-900 dark:bg-secondary-100 shadow-lg full-scroll-lock',
          'rounded-md',
          className
        )}
      >
        {showCloseButton && (
          <div className="absolute right-0">
            {showCloseButton && (
              <Button
                onClick={() => closeAction()}
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
