'use client';
import { Section } from '@/components/section';
import CheckoutSummary from './summary';
import CheckoutOptions from './options';

export default function Checkout() {
  return (
    <>
      <Section tag="section" appearance="thin">
        <div className="flex flex-col lg:flex-row gap-2 text-white lg:gap-10">
          <CheckoutOptions className="lg:flex-[2] 2xl:flex-[2.5] " />
          <CheckoutSummary className="lg:flex-[1.2] 2xl:flex-[1]" />
        </div>
      </Section>
    </>
  );
}
