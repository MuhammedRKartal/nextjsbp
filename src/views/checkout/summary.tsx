import clsx from 'clsx';
import CheckoutItem from './checkout-item';
import { useGetBasketQuery } from '@/data/client/basket';
import { Loader } from '@/components/loader';

export default function CheckoutSummary(props) {
  const { className } = props;
  const {
    data,
    isLoading,
    isSuccess,
    error: basketError
  } = useGetBasketQuery();

  return (
    <Loader loading={isLoading} className={className}>
      {isSuccess && (
        <div className={className}>
          <div
            className={clsx(
              'flex justify-between text-2xl font-bold pb-5',
              'lg:pt-4 lg:text-base lg:font-normal'
            )}
          >
            <span>Summary</span>
          </div>
          <ul>
            {data?.product_list?.map((item, index) => {
              return <CheckoutItem key={item.item_id} checkoutItem={item} />;
            })}
          </ul>
        </div>
      )}
    </Loader>
  );
}
