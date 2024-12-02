"use client";

import { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import { Image } from "@/components/image";
import { Modal } from "@/components/Modal/modal";
import { Section } from "@/components/section";
import { useFetchOrderStatusQuery } from "@/data/client/checkout";
import { removeBlur } from "@/utils";

export interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setExpired: (open: boolean) => void;
  setSuccess: (open: boolean) => void;
  data: any;
}
export default function CryptoPayModal({
  open,
  setOpen,
  setExpired,
  setSuccess,
  data,
}: ModalProps) {
  let statusCodeClassName = "";

  switch (data.orderStatus) {
    case 100:
      statusCodeClassName = "text-white-400 dark:text-black-600";
      break;
    case 200:
      statusCodeClassName = "text-primary-300 dark:text-secondary-300";
      break;
    case 300:
      statusCodeClassName = "text-primary dark:text-secondary";
      break;
    case 400:
      statusCodeClassName = "text-primary-400 dark:text-secondary-400";
      break;
    case 500:
      statusCodeClassName = "text-error";
      break;
  }

  const { data: statusData } = useFetchOrderStatusQuery(
    { token: data.orderId },
    {
      pollingInterval: 6000,
    }
  );

  if (statusData?.orderStatus === 500) {
    removeBlur();
    setOpen(false);
    setExpired(true);
  }

  if (statusData?.orderStatus === 400) {
    removeBlur();
    setOpen(false);
    setSuccess(true);
  }

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPrice, setCopiedPrice] = useState(false);

  const orderId = data?.orderId;
  const paymentMethod = data?.invoice?.cryptoCode;
  const price = data?.invoice?.amount;
  const paymentLink = data?.invoice?.paymentLink;
  const paymentLinkText = paymentLink?.split("litecoin:")[1]?.split("?")[0];
  const qrCode = data?.invoice?.qr_code;
  const orderStatusLabel = data?.orderStatusLabel;

  const onClickCopyLink = async () => {
    navigator?.clipboard?.writeText(paymentLink);
    setCopiedLink(true);

    setTimeout(() => {
      setCopiedLink(false);
    }, 1300);
  };

  const onClickCopyPrice = async () => {
    navigator?.clipboard?.writeText(price);
    setCopiedPrice(true);

    setTimeout(() => {
      setCopiedPrice(false);
    }, 1300);
  };

  return (
    <>
      <Modal
        wrapperId="crypto-pay-modal"
        open={open}
        setOpen={setOpen}
        data={data}
        outsideClick={false}
      >
        <Section className="flex flex-col items-center  relative">
          <Image
            width={60}
            height={60}
            src={"/assets/company-logo-minimized.png"}
            alt={`BTC Payment QR Code of Order Number: ${orderId}`}
            className="mb-3"
          ></Image>
          <div
            className="cursor-pointer flex items-center gap-1 text-2xl font-bold mb-4"
            onClick={() => onClickCopyPrice()}
          >
            <span className="text-2xl">{price}</span>
            <span>{paymentMethod}</span>
            <FontAwesomeIcon
              className={clsx(
                "-mt-1 ms-2 cursor-pointer hover:text-primary-200 dark:hover:text-secondary-800 transform-all duration-100",
                copiedPrice && "text-primary-200 dark:text-secondary-800"
              )}
              icon={copiedPrice ? faCheck : faCopy}
            ></FontAwesomeIcon>
          </div>

          <div className="mb-6">
            <Image
              width={300}
              height={300}
              src={qrCode}
              alt={`BTC Payment QR Code of Order Number: ${orderId}`}
              onClick={() => onClickCopyLink()}
              className="cursor-pointer"
            ></Image>
          </div>
          <div className="mb-4">
            <div className="text-sm font-bold uppercase text-white-400 dark:text-black-600">
              Address
            </div>
            <div
              className="flex gap-1.5 items-center  hover:scale-105 transform-all duration-100"
              onClick={() => onClickCopyLink()}
            >
              <div className="flex gap-1 max-w-[280px] cursor-pointer">
                <span className="text-primary-400 dark:text-secondary-400 font-black flex items-center">
                  <FontAwesomeIcon icon={faChevronLeft} className="text-[10px]" />
                </span>
                <span className="text-sm overflow-auto no-scrollbar">{paymentLinkText}</span>
                <span className="text-primary-400 dark:text-secondary-400 font-black flex items-center">
                  <FontAwesomeIcon icon={faChevronLeft} className="text-[10px] rotate-180" />
                </span>
              </div>
              <FontAwesomeIcon
                className={clsx(
                  "-mt-1 cursor-pointer hover:text-primary-200 dark:text-secondary-800 transform-all duration-100",
                  copiedLink && "text-primary-200 dark:text-secondary-800"
                )}
                icon={copiedLink ? faCheck : faCopy}
                onClick={() => onClickCopyLink()}
              ></FontAwesomeIcon>
            </div>
          </div>

          <div className={clsx("pb-6 pt-2", statusCodeClassName)}>
            <span>{orderStatusLabel}</span>
            <FontAwesomeIcon
              icon={faSpinner}
              className="animate-spin ms-2 -mb-px"
            ></FontAwesomeIcon>
          </div>

          <Link
            className="flex items-center text-white-300 dark:text-black-700 grayscale hover: hover:grayscale-0 transform-all duration-300"
            href={"https://btcpayserver.org/"}
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="text-sm">Powered by </span>
            <Image
              src={"https://btcpayserver.org/img/btcpay.svg"}
              alt={"BTCPay Logo"}
              width={30}
              height={30}
            ></Image>{" "}
            <span className="text-base">BTCPay</span>
          </Link>
        </Section>
      </Modal>
    </>
  );
}
