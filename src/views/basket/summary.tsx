"use client";

import clsx from "clsx";
import { Button } from "@/components/button";
import { Price } from "@/components/price";
import { ROUTES } from "@/routes";

interface BasketSummaryProps {
  total_amount: string;
  total_quantity: number;
  currency_symbol: string;
}

export default function BasketSummary(props: BasketSummaryProps) {
  const { total_amount, total_quantity, currency_symbol } = props;

  return (
    <>
      <div
        className={clsx(
          "text-2xl font-semibold  flex justify-between items-center pb-5 border-b border-outline",
          "lg:text-base lg:font-500 lg:pt-4"
        )}
      >
        <span>{`Summary`}</span>
        <span className="text-xs">{`${total_quantity} Items`}</span>
      </div>
      <div
        className={clsx("flex justify-between text-sm border-b pt-4 pb-3.5 h-32 border-outline")}
      >
        <span>{`Sum of Products (${total_quantity} items)`}</span>
        <Price value={parseFloat(total_amount)} currency={currency_symbol} />
      </div>
      <div
        className={clsx(
          "flex justify-between text-2xl font-bold border-b pb-3 pt-2.5 mb-4 border-outline",
          "lg:text-lg"
        )}
      >
        <span>{`Total`}</span>
        <Price value={parseFloat(total_amount)} currency={currency_symbol} />
      </div>
      <Button className="w-full text-base font-bold" link={ROUTES.CHECKOUT}>
        Checkout
      </Button>
    </>
  );
}
