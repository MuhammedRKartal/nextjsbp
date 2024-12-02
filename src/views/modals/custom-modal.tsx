"use client";

import { Modal } from "@/components/Modal/modal";
import { Section } from "@/components/section";

export interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function CustomModal({ open, setOpen }: ModalProps) {
  return (
    <>
      <Modal wrapperId="Popup" open={open} setOpen={setOpen} title={"hey"}>
        <Section className="">6</Section>
      </Modal>
    </>
  );
}
