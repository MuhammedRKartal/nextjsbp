import { Section } from '@/components/section';
import { basket } from '@/data/urls';
import { getCookie } from 'cookies-next';
import BasketItem from './basket-item';
import BasketSummary from './summary';
import clsx from 'clsx';
import { useGetBasketQuery } from '@/data/client/basket';
import EmptyBasket from './empty-basket';

export default function Basket() {
  const refresh_token = getCookie('refresh_token');
  const headers = {
    Cookie: `refresh_token=${refresh_token}`,
    'Content-Type': 'application/json'
  };
  const {
    data: basket,
    isLoading,
    isSuccess,
    error: basketError
  } = useGetBasketQuery();

  console.log(basket);

  const currency_symbol = basket?.product_list[0]?.currency_symbol;

  return (
    <>
      {isSuccess &&
      basket &&
      basket.product_list &&
      basket.product_list.length > 0 ? (
        <Section tag="section" appearance="thin">
          <div className="flex flex-col lg:flex-row gap-2 text-white lg:gap-10">
            <div className="w-full lg:w-2/3">
              <div
                className={clsx(
                  'text-2xl font-bold pb-5',
                  'lg:pt-4 lg:text-base lg:font-normal'
                )}
              >
                My Basket
              </div>
              <ul>
                {basket?.product_list.map((item, index) => {
                  return (
                    <BasketItem
                      key={item.product.images[0].alt_text}
                      basketItem={item}
                    />
                  );
                })}
              </ul>
            </div>
            <div className="w-full lg:w-1/3">
              <BasketSummary
                total_amount={basket?.total_amount}
                total_quantity={basket?.total_quantity}
                currency_symbol={currency_symbol}
              />
            </div>
          </div>
        </Section>
      ) : (
        <EmptyBasket />
      )}
    </>
  );
}
