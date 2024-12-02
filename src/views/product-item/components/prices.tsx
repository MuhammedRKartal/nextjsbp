"use client";

import { Price } from "@/components/price";

export const Prices = props => {
  const {
    product: { price, retail_price, currency_symbol },
  } = props;

  return (
    <div className="flex gap-1.5">
      <Price value={price} currency={currency_symbol} className=" text-sm font-bold" />
      {parseFloat(retail_price) > parseFloat(price) && (
        <Price
          value={retail_price}
          currency={currency_symbol}
          className="text-white-400 dark:text-black-600 text-sm font-bold line-through"
        />
      )}
    </div>
  );
};
