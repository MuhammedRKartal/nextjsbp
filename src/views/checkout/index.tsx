'use client';
import { Section } from '@/components/section';
import CheckoutSummary from './summary';
import CheckoutOptions from './options';
import { useGetBasketQuery } from '@/data/client/basket';
import { Loader } from '@/components/loader';

export default function Checkout() {
  const {
    data,
    isLoading,
    isSuccess,
    error: basketError
  } = useGetBasketQuery();

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
            data={data}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </div>
      </Section>
    </>
  );
}
