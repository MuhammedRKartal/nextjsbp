import { Price } from "@/components/price";

interface BasketItemPropsType {
  product: {
    price: number;
    retail_price: number;
    currency_symbol: string;
  };
}

export const BasketItemPrice = (props: BasketItemPropsType) => {
  const {
    product: { price, retail_price, currency_symbol },
  } = props;

  return (
    <div className="flex items-center gap-1">
      <Price value={price} currency={currency_symbol} className="text-sm font-bold" />
      {retail_price > price && (
        <Price
          value={retail_price}
          currency={currency_symbol}
          className="text-white-400 text-xs font-bold line-through"
        />
      )}
    </div>
  );
};
