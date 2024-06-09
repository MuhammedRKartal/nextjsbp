"use client";
import clsx from "clsx";
import CheckoutItem from "./checkout-item";
import { Loader } from "@/components/loader";
import { Price } from "@/components/price";
import { BasketType } from "@/types";

interface CheckoutSummaryProps {
  data: BasketType;
  isLoading: boolean;
  isSuccess: boolean;
  className?: string;
}

export default function CheckoutSummary(props: CheckoutSummaryProps) {
  const { data, isLoading, isSuccess, className } = props;

  return (
    <>
      <div className={className}>
        <div
          className={clsx(
            "flex justify-between items-center text-2xl font-bold pt-3 pb-5 border-y border-outline dark:border-secondaryoutline",
            "lg:pt-4 lg:text-base lg:font-500"
          )}
        >
          <span>Summary</span>
          <span className="text-xs">{`${data ? data.total_quantity : 0} Items`}</span>
        </div>
        <Loader isLoading={isLoading} showIcon={false}>
          <ul>
            {data?.product_list?.map(item => {
              return <CheckoutItem key={item.item_id} checkoutItem={item} />;
            })}
          </ul>
        </Loader>
        <div
          className={clsx(
            "text-sm border-b pt-4 pb-3.5 h-32 border-outline dark:border-secondaryoutline"
          )}
        >
          {data?.product_list?.length > 0 && (
            <Price
              value={Number(data?.total_amount)}
              currency={data?.product_list[0]?.product?.currency_symbol}
            />
          )}
          {data?.product_list?.map(item => {
            return (
              <div className="flex justify-between">
                <span>{`${item.quantity}x ${item.product.name}`}</span>
                <Price value={Number(item.total_amount)} currency={item.product.currency_symbol} />
              </div>
            );
          })}
        </div>
        <div
          className={clsx(
            "flex justify-between items-center text-2xl font-bold pt-3 pb-5 border-y border-outline dark:border-secondaryoutline",
            "lg:pt-4 lg:text-lg"
          )}
        >
          <span>Total</span>
          {data?.product_list?.length > 0 && (
            <Price
              value={Number(data?.total_amount)}
              currency={data?.product_list[0]?.product?.currency_symbol}
            />
          )}
        </div>
      </div>
    </>
  );
}
