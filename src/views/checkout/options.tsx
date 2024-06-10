"use client";
import { TabItem } from "@/components/Tab/tab-item";
import { useState } from "react";
import { TabContent } from "@/components/Tab/tab-content";
import CryptoPay from "./payment-methods/crypto-pay";

export default function CheckoutOptions(props) {
  const { className } = props;

  const [active, setActive] = useState(1);

  const handleToggle = index => {
    setActive(index);
  };
  return (
    <div className={className}>
      <div className="relative flex gap-4 -mb-px">
        <TabItem tabId={1} handleToggle={handleToggle} title="BTCPay" active={active}></TabItem>
      </div>
      <div className="relative border z-0 border-outline dark:border-secondaryoutline">
        <TabContent tabId={1} active={active}>
          <CryptoPay />
        </TabContent>
      </div>
    </div>
  );
}
