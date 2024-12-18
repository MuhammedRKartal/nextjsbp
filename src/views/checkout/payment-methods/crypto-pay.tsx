"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { useCreateCheckoutMutation } from "@/data/client/checkout";
import { ROUTES } from "@/routes";
import { CheckoutType } from "@/types";
import CryptoPayModal from "@/views/modals/crypto-pay-modal";
import ExpirationModal from "@/views/modals/order-expired-modal";
import SuccessModal from "@/views/modals/order-success-modal";

export default function CryptoPay() {
  const [invoiceData, setData] = useState({} as CheckoutType);
  const [open, setOpen] = useState(false);
  const [expired, setExpired] = useState(false);
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [createCheckout] = useCreateCheckoutMutation();

  const onCloseExpiredAction = () => {
    router.push(ROUTES.BASKET);
  };

  const onCloseSuccessAction = () => {
    router.push(ROUTES.ORDERS);
  };

  const onClickOperation = () => {
    setLoading(true);
    createCheckout()
      .unwrap()
      .then(data => {
        setData(data);
        setOpen(true);
        setLoading(false);
      });
  };

  return (
    <>
      {success && (
        <SuccessModal open={success} setOpen={setSuccess} onClose={() => onCloseSuccessAction()} />
      )}
      {expired && (
        <ExpirationModal
          open={expired}
          setOpen={setExpired}
          onClose={() => onCloseExpiredAction()}
        />
      )}
      {open && Object.keys(invoiceData).length > 0 && (
        <CryptoPayModal
          open={open}
          setOpen={setOpen}
          data={invoiceData}
          setExpired={setExpired}
          setSuccess={setSuccess}
        ></CryptoPayModal>
      )}
      <section className="">
        <div className="py-4 px-7 border-b border-outline">
          <span className="text-2xl">BTCPay Transaction Guide</span>
        </div>
        <div className="px-7 pt-6 pb-7">
          <ol className="text-sm flex flex-col gap-1.5 list-disc list-inside">
            <li>Our payment method of choice is LTC.</li>
            <li>Select Continue Payment to display your latest active order .</li>
            <li>Send the following amount of LTC to the address displayed.</li>
            <li>The total amount you have to pay is {invoiceData?.invoice?.amount} LTC.</li>
            <li>The order will be delivered after 2 confirmations on the block chain.</li>
            <li>
              For all your questions about Pay at the Door, you can visit our Frequently Asked
              Questions page.
            </li>
            <li>Thank you for choosing WoW Tasker.</li>
          </ol>
          <div className="fixed bottom-0 left-0 z-50 rounded-none w-full font-bold flex justify-center mt-8 md:relative 2xl:justify-end">
            <Button
              isloading={loading}
              className="z-50 font-bold w-full md:w-auto md:px-16 md:z-0 md:relative md:h-12 lg:w-full 2xl:w-auto 2xl:px-32"
              onClick={onClickOperation}
            >
              Continue Payment
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
