import clsx from 'clsx';
import CheckoutItem from './checkout-item';
import { Loader } from '@/components/loader';
import { Price } from '@/components/price';

export default function CheckoutSummary(props) {
  const { data, isLoading, isSuccess, className } = props;

  return (
    <div className={className}>
      <div
        className={clsx(
          'flex justify-between items-center text-2xl font-bold pt-3 pb-5 border-y border-secondary-darkest',
          'lg:pt-4 lg:text-base lg:font-normal'
        )}
      >
        <span>Summary</span>
        <span className="text-xs">{`${
          data ? data.total_quantity : 0
        } Items`}</span>
      </div>
      <Loader isLoading={isLoading} showIcon={false}>
        <ul>
          {data?.product_list?.map((item) => {
            return <CheckoutItem key={item.item_id} checkoutItem={item} />;
          })}
        </ul>
      </Loader>
      <div
        className={clsx(
          'text-sm border-b pt-4 pb-3.5 h-32 border-secondary-darkest'
        )}
      >
        <div className="flex justify-between mb-2.5">
          <span>{`Sum of Products (${data?.total_quantity} items)`}</span>
          <Price
            value={data?.total_amount}
            currency={data?.product_list[0]?.currency_symbol}
          />
        </div>
        {data?.product_list?.map((item) => {
          return (
            <div className="flex justify-between">
              <span>{`${item.quantity}x ${item.product.name}`}</span>
              <Price
                value={item.total_amount}
                currency={item.product.currency_symbol}
              />
            </div>
          );
        })}
      </div>
      <div
        className={clsx(
          'flex justify-between items-center text-2xl font-bold pt-3 pb-5 border-y border-secondary-darkest',
          'lg:pt-4 lg:text-lg'
        )}
      >
        <span>Total</span>
        <Price
          value={data?.total_amount}
          currency={data?.product_list[0]?.currency_symbol}
        />
      </div>
    </div>
  );
}
