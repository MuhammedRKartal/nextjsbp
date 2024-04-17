'use client';

import { Button } from '@/components/button';
import { useCreateCheckoutMutation } from '@/data/client/checkout';
import { CheckoutType } from '@/types';
import { useState } from 'react';

export default function BTCPay() {
  const [data, setData] = useState({} as CheckoutType);
  const [createCheckout] = useCreateCheckoutMutation();

  const onClickOperation = () => {
    createCheckout({
      basket_id: 1
    })
      .unwrap()
      .then((data) => setData(data));
  };

  return (
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
        <div className="fixed bottom-0 left-0 rounded-none w-full font-bold flex justify-center mt-8 md:relative lg:justify-end">
          <Button size="xs" className="font-bold px-32 w-full md:w-auto">
            Complete Payment
          </Button>
        </div>
      </div>
    </section>
  );
}
