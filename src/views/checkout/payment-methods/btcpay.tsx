'use client';

import { Modal } from '@/components/Modal/modal';
import { Button } from '@/components/button';
import { useCreateCheckoutMutation } from '@/data/client/checkout';
import { CheckoutType } from '@/types';
import { useState } from 'react';

export default function BTCPay() {
  const [invoiceData, setData] = useState({} as CheckoutType);
  const [open, setOpen] = useState(false);
  const [createCheckout] = useCreateCheckoutMutation();

  const onClickOperation = () => {
    createCheckout()
      .unwrap()
      .then((data) => {
        console.log();

        setOpen(true);
        setData(data);
      });
  };

  console.log(invoiceData?.invoice?.checkoutLink);

  return (
    <>
      <Modal
        wrapperId="btcpay-modal"
        open={open}
        setOpen={setOpen}
        className="w-full h-full"
      >
        <iframe
          src={invoiceData?.invoice?.checkoutLink}
          className="w-full"
          width="100%"
          height="100%"
        ></iframe>
      </Modal>
      <section className="text-white">
        <div className="py-4 px-7 border-b border-secondary-darkest">
          <span className="text-2xl">BTC Pay Information</span>
        </div>
        <div className="px-7 pt-6 pb-7">
          <ol className="text-sm">
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              mollitia atque asperiores impedit.
            </li>
            <li>
              Mollitia inventore cum culpa doloribus praesentium obcaecati odit.
            </li>
            <li>
              Lorem ipsum dolor sit amet doloribus praesentium obcaecati odit.
            </li>
            <li>
              Lorem ipsum dolor sit amet doloribus praesentium obcaecati odit.
            </li>
          </ol>
          <div className="fixed bottom-0 left-0 rounded-none w-full font-bold flex justify-center mt-8  md:relative lg:justify-end">
            <Button
              size="xs"
              className="font-bold px-32 w-full md:w-auto z-50 md:z-0"
              onClick={onClickOperation}
            >
              Complete Payment
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
