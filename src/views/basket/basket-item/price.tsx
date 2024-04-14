import { Price } from '@/components/price';

export const BasketItemPrice = (props) => {
  const {
    product: { price, retail_price, currency_symbol }
  } = props;

  return (
    <div className="flex items-center gap-1">
      <Price
        value={price}
        currency={currency_symbol}
        className="text-white text-sm font-bold"
      />
      {parseFloat(retail_price) > parseFloat(price) && (
        <Price
          value={retail_price}
          currency={currency_symbol}
          className="text-gray-400 text-xs font-bold line-through"
        />
      )}
    </div>
  );
};
