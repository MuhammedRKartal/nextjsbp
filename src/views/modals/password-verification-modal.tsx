"use client";

import { useState } from "react";
import clsx from "clsx";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OTPInput from "react-otp-input";
import { Button } from "@/components/button";
import { Modal } from "@/components/Modal/modal";
import { Section } from "@/components/section";
import { confirms } from "@/data/urls";
import { blurBackground, removeBlur } from "@/utils";

export interface ModalProps {
  open: boolean;
  body?: any;
  setOpen: (open: boolean) => void;
}

export default function PasswordVerificationModal({ open, body, setOpen }: ModalProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [success, setSuccess] = useState(false);
  const [isloading, setLoading] = useState(false);

  blurBackground();

  const onClose = () => {
    setOtp("");
    setError(false);
    setErrorText("");
    setSuccess(false);
    removeBlur();
  };

  const onSubmit = async () => {
    body["code"] = otp;

    if (otp.length === 6 && isloading === false) {
      setLoading(true);
      setTimeout(async () => {
        try {
          const res = await fetch(`/api/client${confirms[body.formType]}`, {
            method: "POST",
            body: JSON.stringify(body),
          });

          setLoading(false);

          if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            setError(true);
            setErrorText(error.message || "An unexpected error occurred. Please try again.");
            return;
          }
          setSuccess(true);
          setTimeout(() => {
            onClose();
            setOpen(false);
          }, 1000);
        } catch (error) {
          setLoading(false);
          setError(true);
          setErrorText("An unexpected error occurred. Please try again.");
        }
      }, 500);
    } else if (isloading === false && otp.length < 6) {
      setError(true);
      setErrorText("Please enter a 6-digit code.");
    }
  };

  return (
    <>
      <Modal
        wrapperId="Password-verification-modal"
        open={open}
        setOpen={setOpen}
        onClose={onClose}
        title={"Confirmation Code"}
      >
        <Section className="flex flex-col items-center">
          <div className="text-white text-2xl mt-4 mb-1">Enter Code</div>
          <div className="text-white-300  mb-1">
            Enter the 6-digit code sent by WoWTasker Email Provider.
          </div>
          <div className="text-xs text-white-400  mb-8">
            Please check your spam folder if you didn't receive the email.
          </div>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={""}
            inputType="number"
            containerStyle={clsx("gap-1", error ? "mb-2" : "mb-12")}
            renderInput={props => (
              <input
                {...props}
                className={clsx(
                  "!w-12 h-12 rounded border-2 border-outline text-lg font-bold text-white-500",
                  error && "!border-error !border"
                )}
              />
            )}
          />
          {error && <div className="mb-12 text-error font-bold text-sm">{errorText}</div>}
          <Button className="w-full" onClick={onSubmit} isloading={isloading}>
            {success ? <FontAwesomeIcon icon={faCheckCircle} /> : <div>Confirm</div>}
          </Button>
        </Section>
      </Modal>
    </>
  );
}
