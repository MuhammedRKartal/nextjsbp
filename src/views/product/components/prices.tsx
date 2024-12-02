"use client";

import clsx from "clsx";
import { Price } from "@/components/price";

export const Prices = props => {
  const {
    product: { price, retail_price, currency_symbol },
  } = props;

  return (
    <div
      className={clsx(
        "flex flex-row-reverse justify-end items-center gap-1",
        "lg:flex-col lg:justify-start lg:items-start lg:gap-0"
      )}
    >
      {parseFloat(retail_price) > parseFloat(price) && (
        <Price
          value={retail_price}
          currency={currency_symbol}
          className="text-white-400 dark:text-black-600 text-sm font-bold line-through"
        />
      )}
      <Price value={price} currency={currency_symbol} className=" text-base font-bold" />
    </div>
  );
};
