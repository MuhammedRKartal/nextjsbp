'use client';

import { Section } from '@/components/section';
import BasketItem from './basket-item';
import BasketSummary from './summary';
import clsx from 'clsx';
import { useGetBasketQuery } from '@/data/client/basket';
import EmptyBasket from './empty-basket';
import Link from 'next/link';
import { Loader } from '@/components/loader';

export default function Basket() {
  const {
    data: basket,
    isSuccess,
    error: basketError,
    isLoading
  } = useGetBasketQuery();

  const currency_symbol = basket?.product_list[0]?.currency_symbol;

  return (
    <Loader loading={isLoading}>
      {isSuccess &&
      basket &&
      basket.product_list &&
      basket.product_list.length > 0 ? (
        <Section tag="section" appearance="thin">
          <div className="flex flex-col lg:flex-row gap-2 text-white lg:gap-10">
            <div className="w-full lg:w-2/3">
              <div
                className={clsx(
                  'flex justify-between text-2xl font-bold pb-5',
                  'lg:pt-4 lg:text-base lg:font-normal'
                )}
              >
                <span>My Basket</span>
                <Link
                  href="/product-list"
                  className="underline text-[10px] text-gray-300 tracking-wide"
                >
                  Back to Shopping
                </Link>
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
    </Loader>
  );
}
