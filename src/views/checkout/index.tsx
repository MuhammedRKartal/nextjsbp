'use client';
import { Section } from '@/components/section';
import CheckoutSummary from './summary';
import CheckoutOptions from './options';
import { useGetBasketQuery } from '@/data/client/basket';
import { Loader } from '@/components/loader';
import { useGetLastActiveOrderQuery } from '@/data/client/account';
import { useEffect, useState } from 'react';
import { BasketType } from '@/types';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes';

export default function Checkout() {
  const {
    data: basketData,
    isLoading,
    isSuccess: basketSuccess,
    error: basketError
  } = useGetBasketQuery();
  const [data, setData] = useState(basketData as BasketType);

  const { data: activeOrder, isSuccess: activeSuccess } =
    useGetLastActiveOrderQuery();

  const activeOrderObject = {
    pk: activeOrder?.basket,
    product_list: activeOrder?.productList,
    total_amount: activeOrder?.totalAmount,
    total_quantity: activeOrder?.totalQuantity
  };

  useEffect(() => {
    if (
      !basketData ||
      basketData?.total_quantity === null ||
      basketData?.total_quantity === 0
    ) {
      setData(activeOrderObject);
    } else {
      setData(basketData);
    }
  }, [basketSuccess, activeSuccess]);

  const router = useRouter();

  if (data) {
    if (
      (basketSuccess === true || activeSuccess === true) &&
      (data.total_quantity === null || data.total_quantity === undefined)
    ) {
      router.push(ROUTES.ORDERS);
    }
  } else {
    router.push(ROUTES.ORDERS);
  }

  return (
    <>
      <Section tag="section" appearance="thin">
        <div className="flex flex-col lg:flex-row gap-6 text-white lg:gap-10">
          <Loader
            loading={isLoading}
            showIcon={false}
            className="lg:flex-[2] 2xl:flex-[2.5]"
          >
            {basketSuccess && (
              <CheckoutOptions className="lg:flex-[2] 2xl:flex-[2.5]" />
            )}
          </Loader>

          <div className="lg:flex-[1.2] 2xl:flex-[1]">
            {data?.total_quantity !== undefined && (
              <CheckoutSummary
                data={data}
                isSuccess={basketSuccess || activeSuccess}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
