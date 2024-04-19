'use client';
import { Section } from '@/components/section';
import { Modal } from '@/components/Modal/modal';
import { useState } from 'react';
import { Button } from '@/components/button';
import { faWarning } from '@fortawesome/free-solid-svg-icons/faWarning';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
}
export default function ExpirationModal({
  open,
  setOpen,
  onClose
}: ModalProps) {
  const removeBlur = () => {
    document.getElementById('main').classList.remove('blur-sm');
    document.getElementById('header').classList.remove('blur-sm');
    document.getElementById('footer').classList.remove('blur-sm');
  };

  const onClickClose = () => {
    removeBlur();
    onClose();
  };

  return (
    <>
      <Modal
        wrapperId="expiration-modal"
        open={open}
        setOpen={setOpen}
        onClose={onClose}
      >
        <Section className="text-center text-white">
          <FontAwesomeIcon
            icon={faWarning}
            size="2xl"
            className="text-error mb-4"
          ></FontAwesomeIcon>
          <h3 className="text-2xl mb-3">Your Order is Expired</h3>
          <Button
            appearance="ghost"
            size="xs"
            className="w-full text-base"
            onClick={() => onClickClose()}
          >
            Continue Shopping
          </Button>
        </Section>
      </Modal>
    </>
  );
}
