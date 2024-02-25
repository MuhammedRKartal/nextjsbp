'use client';
import { Section } from '@/src/components/section';
import { Modal } from '@/src/components/modal';
import { useState } from 'react';

export interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function CustomModal({ open, setOpen }: ModalProps) {
  return (
    <>
      <Modal wrapperId="Popup" open={open} setOpen={setOpen} title={'hey'}>
        <Section className="text-white">hey</Section>
      </Modal>
    </>
  );
}
