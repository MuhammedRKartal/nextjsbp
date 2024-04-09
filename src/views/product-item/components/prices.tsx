'use client';
import { Price } from '@/components/price';

export const Prices = (props) => {
  const {
    product: { price, retail_price, currency_type }
  } = props;

  return (
    <div className="flex gap-1.5">
      <Price
        value={price}
        currency={currency_type}
        className="text-white text-sm font-bold"
      />
      {parseFloat(retail_price) > parseFloat(price) && (
        <Price
          value={retail_price}
          currency={currency_type}
          className="text-gray-400 text-sm font-bold line-through"
        />
      )}
    </div>
  );
};
