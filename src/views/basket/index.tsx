"use client";

import Link from "next/link";
import clsx from "clsx";
import { Loader } from "@/components/loader";
import { Section } from "@/components/section";
import { useGetBasketQuery } from "@/data/client/basket";
import BasketItem from "./basket-item";
import EmptyBasket from "./empty-basket";
import BasketSummary from "./summary";

export default function Basket() {
  const { data: basket, isSuccess, isLoading } = useGetBasketQuery();

  const currency_symbol = basket?.product_list[0]?.currency_symbol;

  return (
    <Loader loading={isLoading}>
      {isSuccess && basket && basket.product_list && basket.product_list.length > 0 ? (
        <Section tag="section" appearance="thin">
          <div className="flex flex-col lg:flex-row gap-2  lg:gap-10">
            <div className="w-full lg:w-2/3">
              <div
                className={clsx(
                  "flex justify-between text-2xl font-bold pb-5",
                  "lg:pt-4 lg:text-base lg:font-500"
                )}
              >
                <span>My Basket</span>
                <Link
                  href="/products"
                  className="underline text-[10px] text-white-300 dark:text-black-700 tracking-wide"
                >
                  Back to Shopping
                </Link>
              </div>
              <ul>
                {basket?.product_list.map(item => {
                  return <BasketItem key={item.product.images[0].alt_text} basketItem={item} />;
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
