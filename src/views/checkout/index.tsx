'use client';
import { Section } from '@/components/section';
import CheckoutSummary from './summary';
import CheckoutOptions from './options';
import { useGetBasketQuery } from '@/data/client/basket';
import { Loader } from '@/components/loader';
import { useGetLastActiveOrderQuery } from '@/data/client/account';

export default function Checkout() {
  const {
    data,
    isLoading,
    isSuccess,
    error: basketError
  } = useGetBasketQuery();

  const { data: activeOrder } = useGetLastActiveOrderQuery();

  const activeOrderObject = {
    pk: activeOrder?.basket,
    product_list: activeOrder?.productList,
    total_amount: activeOrder?.totalAmount,
    total_quantity: activeOrder?.totalQuantity
  };

  return (
    <>
      <Section tag="section" appearance="thin">
        <div className="flex flex-col lg:flex-row gap-6 text-white lg:gap-10">
          <Loader
            loading={isLoading}
            showIcon={false}
            className="lg:flex-[2] 2xl:flex-[2.5]"
          >
            {isSuccess && (
              <CheckoutOptions className="lg:flex-[2] 2xl:flex-[2.5]" />
            )}
          </Loader>

          <CheckoutSummary
            className="lg:flex-[1.2] 2xl:flex-[1]"
            data={data ? data : activeOrderObject}
            isLoading={isLoading}
          />
        </div>
      </Section>
    </>
  );
}
