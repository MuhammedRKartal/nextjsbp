'use client';
import clsx from 'clsx';
import CheckoutItem from './checkout-item';
import { useGetBasketQuery } from '@/data/client/basket';
import { Loader } from '@/components/loader';
import { TabItem } from '@/components/Tab/tab-item';
import { useState } from 'react';
import { TabContent } from '@/components/Tab/tab-content';
import BTCPay from './payment-methods/btcpay';

export default function CheckoutOptions(props) {
  const { className } = props;

  const [active, setActive] = useState(1);

  const handleToggle = (index) => {
    setActive(index);
  };
  return (
    <div className={className}>
      <div className="relative flex gap-4 -mb-px">
        <TabItem
          tabId={1}
          handleToggle={handleToggle}
          title="BTC Pay"
          active={active}
        ></TabItem>
      </div>
      <div className="relative border z-0 border-secondary-darkest">
        <TabContent tabId={1} active={active}>
          <BTCPay />
        </TabContent>
      </div>
    </div>
  );
}
