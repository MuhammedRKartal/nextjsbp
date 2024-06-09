"use client";

import { Price } from "@/components/price";
import { Button } from "@/components/button";
import clsx from "clsx";
import { ROUTES } from "@/routes";

export default function BasketSummary(props) {
  const { total_amount, total_quantity, currency_symbol } = props;

  return (
    <>
      <div
        className={clsx(
          "text-2xl font-semibold  flex justify-between items-center pb-5 border-b border-outline dark:border-secondaryoutline",
          "lg:text-base lg:font-500 lg:pt-4"
        )}
      >
        <span>{`Summary`}</span>
        <span className="text-xs">{`${total_quantity} Items`}</span>
      </div>
      <div
        className={clsx(
          "flex justify-between text-sm border-b pt-4 pb-3.5 h-32 border-outline dark:border-secondaryoutline"
        )}
      >
        <span>{`Sum of Products (${total_quantity} items)`}</span>
        <Price value={total_amount} currency={currency_symbol} />
      </div>
      <div
        className={clsx(
          "flex justify-between text-2xl font-bold border-b pb-3 pt-2.5 mb-4 border-outline dark:border-secondaryoutline",
          "lg:text-lg"
        )}
      >
        <span>{`Total`}</span>
        <Price value={total_amount} currency={currency_symbol} />
      </div>
      <Button className="w-full text-base font-bold" link={ROUTES.CHECKOUT}>
        Checkout
      </Button>
    </>
  );
}
