import { Price } from "@/components/price";

export const CheckoutItemPrice = props => {
  const {
    product: { price, retail_price, currency_symbol },
  } = props;

  return (
    <div className="flex flex-col items-center justify-center">
      {parseFloat(retail_price) > parseFloat(price) && (
        <Price
          value={retail_price}
          currency={currency_symbol}
          className="text-white-400 dark:text-black-600 text-xs font-bold line-through"
        />
      )}
      <Price value={price} currency={currency_symbol} className=" text-sm font-bold" />
    </div>
  );
};
