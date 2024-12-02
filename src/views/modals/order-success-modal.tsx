"use client";

import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/button";
import { Modal } from "@/components/Modal/modal";
import { Section } from "@/components/section";
import { removeBlur } from "@/utils";

export interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
}
export default function SuccessModal({ open, setOpen, onClose }: ModalProps) {
  const onClickClose = () => {
    removeBlur();
    onClose();
  };

  return (
    <>
      <Modal wrapperId="success-modal" open={open} setOpen={setOpen} onClose={onClose}>
        <Section className="text-center ">
          <FontAwesomeIcon
            icon={faCircleCheck}
            size="2xl"
            className="text-primary mb-4"
          ></FontAwesomeIcon>
          <h3 className="text-2xl mb-3">Your Order is Completed</h3>
          <Button
            appearance="ghost"
            size="xs"
            className="w-full text-base"
            onClick={() => onClickClose()}
          >
            See Orders
          </Button>
        </Section>
      </Modal>
    </>
  );
}
